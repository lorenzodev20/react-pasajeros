import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Passenger, Payment } from "../types";
import { usePassengerApi } from "../hooks/usePassengerApi";
import { usePassenger } from "../hooks/usePassenger";
import PaymentItem from "../components/PaymentItem";


export default function DetailPassenger() {
    const { state } = usePassenger()
    const { passengerId } = useParams<{ passengerId: string }>();
    const [passenger, setPassenger] = useState<Passenger>(state.passengerDetail);
    const { getPassenger, getPayments } = usePassengerApi();
    const [payments, setPayments] = useState<Payment[]>([])

    const loadDetail = async () => {
        let { passenger } = await getPassenger(Number(passengerId));
        if (passenger) {
            setPassenger(passenger)
        }
        let { payments } = await getPayments(Number(passengerId));

        if (payments) {
            setPayments(payments);
        }
    }

    useEffect(() => {
        loadDetail();
    }, []);

    return (<>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <p className="text-2xl font-bold underline text-center"> Datos del pasajero </p>
            <p className="font-medium text-center m-1">{`${passenger.name ?? ''} ${passenger.last_name ?? ''}`}</p>
            {passenger.identity && <p className="font-medium text-center m-1">{`${passenger.identity}`}</p>}
            {passenger.notes && (
                <>
                    <p className="font-medium text-center m-1"> NOTAS: </p>
                    <p className="font-medium text-center m-1">{`${passenger.notes}`}</p>
                </>
            )}
        </div>
        {payments.length > 0 ? (
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                {payments.map(item => (
                    <PaymentItem
                        key={item.id}
                        id={item.id}
                        amount={item.amount}
                        payment_method_id={item.payment_method_id}
                        created_at={item.created_at}
                    />
                ))}
            </div>
        ) : (<p className="font-medium text-center m-1"> Sin registro de abonos </p>)}
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex justify-center">
            <Link
                to={"/passengers"}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Volver al listado
            </Link>
        </div>
    </>)
}
