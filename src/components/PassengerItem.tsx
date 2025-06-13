import { BanknotesIcon, DocumentMagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

type PassengerItemProps = {
    id: number,
    name: string,
    last_name: string,
}

export default function PassengerItem({ id, name, last_name }: Readonly<PassengerItemProps>) {

    const fullName = `${name} ${last_name}`;

    return (
        <div className="bg-white shadow rounded-md p-4 flex justify-between items-center">
            <div>
                <p className="font-semibold text-gray-800"> {fullName ?? 'Nombre pasajero'}</p>
                {/* <p className="text-gray-600 text-sm">Información adicional</p> */}
            </div>
            <div className="flex space-x-2">
                <Link to={`/payments/${id}`} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                    <BanknotesIcon className="w-5 text-black" title="Registrar abono" />
                </Link>
                <Link to={`/passenger/${id}/edit`} className="bg-blue-50 text-white px-2 py-1 rounded hover:bg-yellow-500">
                    <PencilSquareIcon className="w-5 text-black" title="Editar" />
                </Link>
                <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">
                    <DocumentMagnifyingGlassIcon className="w-5 text-black" title="Detalle pasajero" />
                </button>
            </div>
        </div>
    )
}
