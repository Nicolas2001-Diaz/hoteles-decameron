import {
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function HotelListItem({ hotel, onDeleteClick }) {
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{hotel.nombre}</h1>

                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 px-4 py-1 rounded-md my-2 hover:bg-red-300"
                        onClick={(ev) => onDeleteClick(hotel.id)}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>

                    <Link
                        to={`/hotel/${hotel.id}`}
                        className="bg-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-300"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </Link>
                </div>
            </header>

            <p className="text-slate-300 pt-2">{hotel.direccion}, {hotel.ciudad}</p>
            <p className="text-slate-300 py-2">NIT: {hotel.nit}</p>
            <p className="text-slate-300">{hotel.numero_habitaciones} Habitaciones</p>
        </div>
    );
}

export default HotelListItem;
