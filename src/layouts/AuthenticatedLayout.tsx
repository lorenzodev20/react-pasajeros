import { Outlet, Navigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function AuthenticatedLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            <Header title="Pasajeros APP" />
            {/* Contenido principal */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Outlet />
            </div>

            {/* Menú inferior */}
            <footer className="bg-white border-t mt-4">
                <div className="grid grid-cols-4 text-center text-gray-600 p-2 md:gap-4">
                    <Link to={"/home"} className="text-blue-600 font-bold flex justify-center">
                        <HomeIcon className="w-10 text-black" title="Home" />
                    </Link>
                    <Link to={"/passenger"} className="text-blue-600 font-bold flex justify-center">
                        Nuevo Pasajero
                    </Link>
                    <button className="hover:text-blue-600 flex justify-center">
                        Lista de pasajeros
                    </button>
                    <button className="hover:text-blue-600 flex justify-center">
                        Salir
                    </button>
                </div>
            </footer>
        </div>
    );
}