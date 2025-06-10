import { Navigate, redirect, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
        navigate("/home");
    }

    return (
        <div className="bg-white flex items-center justify-center h-screen">
            <div className="border border-black p-8 rounded-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Pasajeros App</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-black font-semibold mb-1" htmlFor="email">Correo</label>
                        <input className="w-full border border-black p-2 rounded" type="email" id="email" required />
                    </div>
                    <div>
                        <label className="block text-black font-semibold mb-1" htmlFor="password">Contraseña</label>
                        <input className="w-full border border-black p-2 rounded" type="password" id="password" required />
                    </div>
                    <button className="w-full border border-black py-2 rounded hover:bg-black hover:text-white transition">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
