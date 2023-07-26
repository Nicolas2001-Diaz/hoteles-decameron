import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Card } from "../ui/Card";
import TypeButton from "../ui/TypeButton";

import { useStateContext } from "../../contexts/ContextProvider";

function HotelListItem({ hotel, onDeleteClick }) {
    const { setEditHotel } = useStateContext();

    return (
        <Card>
            <h1 className="text-2xl font-bold">{hotel.nombre}</h1>

            <p className="text-slate-300 pt-2">
                {hotel.direccion}, {hotel.ciudad}
            </p>

            <p className="text-slate-300 py-2">NIT: {hotel.nit}</p>

            <p className="text-slate-300">
                {hotel.numero_habitaciones} Habitaciones
            </p>

            <div className="flex justify-between items-center mt-3">
                <TypeButton to={`/hotel/${hotel.id}`} onClick={(ev) => setEditHotel(true)}>
                    <PencilIcon className="w-5 h-5 mr-2" /> Editar
                </TypeButton>

                <div className="flex items-center">
                    <TypeButton to={`/hotel/${hotel.id}`} circle link>
                        <EyeIcon className="w-5 h-5" />
                    </TypeButton>

                    <TypeButton
                        onClick={(ev) => onDeleteClick(hotel.id)}
                        circle
                        link
                        color="red"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </TypeButton>
                </div>
            </div>
        </Card>
    );
}

export default HotelListItem;
