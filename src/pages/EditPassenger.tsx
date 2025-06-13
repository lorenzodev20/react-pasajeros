import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { usePassenger } from '../hooks/usePassenger';
import type { Passenger } from '../types';
import { usePassengerApi } from '../hooks/usePassengerApi';
import SuccessMessage from '../components/SuccessMessage';
import { useParams } from 'react-router';

export default function EditPassenger() {
    const { passengerId } = useParams<{ passengerId: string }>();
    const { state } = usePassenger();
    const [passenger, setPassenger] = useState<Passenger>(state.passengerDetail);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { updatePassenger, getPassenger } = usePassengerApi();

    useMemo(() => setPassenger(state.passengerDetail), [state.passengerDetail])

    useEffect(() => {
        const loadDetail = async () => {
            let { passenger } = await getPassenger(Number(passengerId));
            if (passenger) {
                setPassenger(passenger)
            }
        }
        loadDetail();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassenger({ ...passenger, [name]: value })
    }

    const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPassenger({ ...passenger, notes: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // dispatch({ type: 'store-passenger', payload: { passenger } })
        setDisabled(true);
        await updatePassenger(Number(passengerId), passenger);

        setSuccess(true);

        setDisabled(false);

        setTimeout(() => setSuccess(false), 3000);
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {success ? (<SuccessMessage>{" Actualización exitosa! "}</SuccessMessage>) : ''}
            <form className="space-y-5 p-2" onSubmit={handleSubmit}>
                <div className="space-y-5 p-2">
                    <p className="text-2xl underline">Edición datos pasajero</p>
                </div>
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

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Documento de identidad</label>
                    <input
                        name="identity"
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={passenger.identity}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Notas</label>
                    <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        name="notes"
                        onChange={handleChangeTextArea}
                        value={passenger.notes}
                    >
                        {passenger.notes}
                    </textarea>
                </div>

                {/* <!-- Botones --> */}
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                        disabled={disabled}
                    >
                        Modificar
                    </button>
                    {/* <button
                        type="button"
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
                        onClick={() => navigate(-1)}
                        disabled={disabled}
                    >Volver</button> */}
                </div>
            </form>
        </div>
    )
}
