import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="bg-white flex items-center justify-center h-screen">
            <div className="text-center border border-black p-8 rounded-lg max-w-md">
                <h1 className="text-6xl font-bold mb-4 text-black">404</h1>
                <p className="text-lg text-black mb-6">Página no encontrada</p>
                <Link
                    to="/"
                    className="inline-block border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
