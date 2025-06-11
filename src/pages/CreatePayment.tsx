import { useState, type ChangeEvent } from "react";
import type { PaymentPreview } from "../types";
import SuccessMessage from "../components/SuccessMessage";
import { paymentMethod } from "../data/payments_methods";
import { useParams } from "react-router";
import { usePassengerApi } from "../hooks/usePassengerApi";


export default function CreatePayment() {
    const { passengerId } = useParams<{ passengerId: string }>();

    const initialState = {
        amount: 0,
        payment_method_id: 1,
        passenger_id: Number(passengerId ?? 0)
    };
    const [payment, setPayment] = useState<PaymentPreview>(initialState);

    const [success, setSuccess] = useState(false);

    const [disabled, setDisabled] = useState(false);

    const { parsePayment, paymentStore } = usePassengerApi();

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name)
        setPayment({ ...payment, [name]: isAmountField ? +value : value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);

        await paymentStore(parsePayment(payment));

        setPayment(initialState);
        setDisabled(false);

        setTimeout(() => setSuccess(false), 3000);
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            {success ? (<SuccessMessage>{" Registro exitoso! "}</SuccessMessage>) : ''}
            <form className="space-y-5 p-2" onSubmit={handleSubmit}>
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
