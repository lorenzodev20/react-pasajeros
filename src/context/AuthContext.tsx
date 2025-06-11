// context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "../config/supabase";
import type { Session } from '@supabase/supabase-js';


type AuthContextProps = {
    isAuthenticated: boolean;
    session: Session | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (!error && data.session) {
                setSession(data.session);
                setIsAuthenticated(true);
            }
        };

        getSession();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setIsAuthenticated(!!session);
        });

        return () => {
            subscription.subscription.unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setIsAuthenticated(false);
    };

    const obj = useMemo(() => ({ isAuthenticated, session, login, logout }), [isAuthenticated, session]);

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
};
