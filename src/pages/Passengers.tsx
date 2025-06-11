import type { Passenger, PassengerForList } from '../types';
import { useEffect, useState } from 'react';
import { usePassengerApi } from '../hooks/usePassengerApi';
import PassengerItem from '../components/PassengerItem';

// type PassengersProps = {
//     passenger: Passenger[]
// }

export default function Passengers() {
    const [passengers, setPassengers] = useState<PassengerForList[]>([]);

    const { all } = usePassengerApi();

    const fetchPassengers = async () => {
        const result = await all();
        if ('passengers' in result) {
            setPassengers(result.passengers);
        } else {
            console.error("Error fetching passengers:", result.error);
        }
    }

    useEffect(() => {
        fetchPassengers()
    }, [])

    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {passengers.map(item => (
                <PassengerItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    last_name={item.last_name}
                />))}
        </div>
    )
}
