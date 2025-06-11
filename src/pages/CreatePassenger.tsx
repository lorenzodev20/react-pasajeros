import React, { useMemo, useState, type ChangeEvent } from 'react'
import { usePassenger } from '../hooks/usePassenger';
import type { PassengerPreview } from '../types';
import { initialPassengerPreview } from '../reducers/passenger-reducer';
import { usePassengerApi } from '../hooks/usePassengerApi';
import SuccessMessage from '../components/SuccessMessage';

export default function CreatePassenger() {
    const { state } = usePassenger();

    const [passenger, setPassenger] = useState<PassengerPreview>(initialPassengerPreview);

    //const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);

    const [disabled, setDisabled] = useState(false);

    const { store, parsePassenger } = usePassengerApi();

    useMemo(() => setPassenger(state.passengerPreview), [state.passengerPreview])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassenger({ ...passenger, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // dispatch({ type: 'store-passenger', payload: { passenger } })
        setDisabled(true);
        await store(parsePassenger(passenger));

        setPassenger(initialPassengerPreview);

        setSuccess(true);

        setDisabled(false);

        setTimeout(() => setSuccess(false), 3000);
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {success ? (<SuccessMessage>{" Registro exitoso! "}</SuccessMessage>) : ''}
            <form className="space-y-5 p-2" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombres</label>
                    <input
                        name="name"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={passenger.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellidos</label>
                    <input
                        name="last_name"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={passenger.last_name}
                        onChange={handleChange}
                    />
                </div>

                {/* <!-- Botones --> */}
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                        disabled={disabled}
                    >Registrar</button>
                    <button
                        type="button"
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
                        onClick={() => setPassenger(initialPassengerPreview)}
                        disabled={disabled}
                    >Limpiar campos</button>
                </div>
            </form>
        </div>
    )
}
