import { BanknotesIcon, DocumentMagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';
import { formatCurrency, formatDate } from '../utils';
import { paymentMethod } from '../data/payments_methods';
import type { PaymentMethodList } from '../types';

type PaymentItemProps = {
    id: number,
    amount: number,
    payment_method_id: number,
    created_at: Date
}

export default function PaymentItem({ id, amount, payment_method_id, created_at }: Readonly<PaymentItemProps>) {
    const { method } = paymentMethod.find( p => p.id === payment_method_id) as PaymentMethodList;
    return (
        <div className="bg-white shadow rounded-md p-4 flex justify-between items-center m-2">
            <div>
                <p className="font-semibold text-gray-800">{ formatCurrency(amount) }</p>
                <p className="text-gray-600 text-sm"> { method } - { formatDate( created_at.toString() )}</p>
            </div>
        </div>
    )
}
