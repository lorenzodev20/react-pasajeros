import { useEffect, useState, type ChangeEvent } from "react";
import type { Passenger, PaymentPreview } from "../types";
import SuccessMessage from "../components/SuccessMessage";
import { paymentMethod } from "../data/payments_methods";
import { useParams } from "react-router";
import { usePassengerApi } from "../hooks/usePassengerApi";
import ErrorMessage from "../components/ErrorMessage";


export default function CreatePayment() {
    const { passengerId } = useParams<{ passengerId: string }>();

    const initialState = {
        amount: 0,
        payment_method_id: 1,
        passenger_id: Number(passengerId ?? 0)
    };
    
    const [payment, setPayment] = useState<PaymentPreview>(initialState);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [disabled, setDisabled] = useState(false);

    const { parsePayment, paymentStore, getPassenger } = usePassengerApi();

    const [passenger, setPassenger] = useState<Passenger | null>(null);

    useEffect(() => {
        const loadDetail = async () => {
            let { passenger } = await getPassenger(Number(passengerId));
            setPassenger(passenger)
        }
        loadDetail();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name)
        setPayment({ ...payment, [name]: isAmountField ? +value : value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);

        if (payment.amount <= 0) {
            setError('El valor a abonar debe ser mayor a 0');
            setPayment(initialState);
            setDisabled(false);
            return;
        }

        await paymentStore(parsePayment(payment));

        setPayment(initialState);
        setDisabled(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && <ErrorMessage> {error}</ErrorMessage>}
            {success ? (<SuccessMessage>{" Registro exitoso! "}</SuccessMessage>) : ''}
            <form className="space-y-5 p-2" onSubmit={handleSubmit}>
                <div className="space-y-5 p-2">
                    <p className="text-2xl underline">Registrar abono a pasajero</p>
                    <div>
                        <p className="font-bold text-2xl"> Nombre:</p>
                        <p className="text-2xl">{`${passenger?.name} ${passenger?.last_name}`}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto a abonar</label>
                    <input
                        name="amount"
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={payment.amount}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">Método de pago</label>
                    <select
                        name="payment_method_id"
                        id="payment_method_id"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={payment.payment_method_id}
                        onChange={handleChange}
                    >
                        <option value="">--Seleccione--</option>
                        {paymentMethod.map(item => (
                            <option key={item.id} value={item.id}> {item.method} </option>
                        ))}
                    </select>
                </div>

                {/* <!-- Botones --> */}
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-500"
                        disabled={disabled}
                    >Abonar</button>
                    <button
                        type="button"
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
                        onClick={() => setPayment(initialState)}
                        disabled={disabled}
                    >Limpiar campos</button>
                </div>
            </form>
        </div>
    )
}
