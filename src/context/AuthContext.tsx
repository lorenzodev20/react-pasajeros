// context/AuthContext.tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AuthContextProps = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = () => {
        console.info('Iniciando sesión ... ');
        setIsAuthenticated(true);
    };
    const logout = () => { 
        console.info('Cerrando sesión ... ');
        setIsAuthenticated(false)
    };

    const obj = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
};
