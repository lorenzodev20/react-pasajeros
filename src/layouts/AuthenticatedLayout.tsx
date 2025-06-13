import { Outlet, Navigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { HomeIcon, ListBulletIcon, LockClosedIcon, UserPlusIcon } from "@heroicons/react/24/solid";

export default function AuthenticatedLayout() {
    const { isAuthenticated, logout } = useAuth();

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
            <footer className="bg-white border-t -translate-y-3/12 md:-translate-0">
                <div className="grid grid-cols-4 text-center text-gray-600 p-2 md:gap-4">
                    <Link to={"/home"} className="text-blue-600 font-bold flex justify-center">
                        <div className="flex flex-col items-center">
                            <HomeIcon className="w-10 text-black" />
                            <span className="text-sm text-black mt-1">Home</span>
                        </div>
                    </Link>
                    <Link to={"/passenger"} className="text-blue-600 font-bold flex justify-center">
                        <div className="flex flex-col items-center">
                            <UserPlusIcon className="w-10 text-black" title="Nuevo Pasajero" />
                            <span className="text-sm text-black mt-1">Nuevo</span>
                        </div>
                    </Link>
                    <Link to={"/passengers"} className="text-blue-600 font-bold flex justify-center">
                        <div className="flex flex-col items-center">
                            <ListBulletIcon className="w-10 text-black" title="Pasajeros" />
                            <span className="text-sm text-black mt-1">Pasajeros</span>
                        </div>
                    </Link>
                    <button className="hover:text-blue-600 flex justify-center" onClick={() => logout()}>
                        <div className="flex flex-col items-center">
                            <LockClosedIcon className="w-10 text-black" title="Salir" />
                            <span className="text-sm text-black mt-1">Salir</span>
                        </div>
                    </button>
                </div>
            </footer>
        </div>
    );
}