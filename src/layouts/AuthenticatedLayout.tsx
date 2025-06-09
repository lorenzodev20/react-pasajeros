import { Outlet } from "react-router";

export default function AuthenticatedLayout() {
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Contenido principal */}
            <div className="flex-1 overflow-y-auto p-4">
                <Outlet />
            </div>

            {/* Menú inferior */}
            <footer className="border-t border-black flex justify-around py-2 bg-white">
                <button className="text-sm">Opción 1</button>
                <button className="text-sm">Opción 2</button>
                <button className="text-sm font-bold">Home</button>
                <button className="text-sm">Opción 3</button>
                <button className="text-sm">Opción 4</button>
            </footer>
        </div>
    );
}
