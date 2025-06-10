import React from 'react'

export default function CreatePassenger() {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombres</label>
                <input
                    name="name"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellidos</label>
                <input
                    name="last_name"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            {/* <!-- Botones --> */}
            <div className="flex justify-between mt-4">
                <button type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                <button type="button"
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
            </div>
        </form>
        </div>
    )
}
