import { Navigate, redirect, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/home");
        } catch (err: any) {
            console.error("Error al iniciar sesión:", err.message);
            setErrorMsg("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="bg-white flex items-center justify-center h-screen">
                <div className="border border-black p-8 rounded-lg w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-center mb-6">Pasajeros App</h1>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-black font-semibold mb-1" htmlFor="email">Correo</label>
                            <input
                                className="w-full border border-black p-2 rounded"
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-black font-semibold mb-1" htmlFor="password">Contraseña</label>
                            <input
                                className="w-full border border-black p-2 rounded"
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
                        <button className="w-full border border-black py-2 rounded hover:bg-black hover:text-white transition">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
            <footer className="mt-6 text-sm text-black text-center p-2 bg-gray-200">
                <p> © {new Date().getFullYear()} Desarrollado por Lorenzo Rojo (Echoforge Dev) </p>
            </footer>
        </div>
    );
}
