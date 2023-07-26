import { Link } from "react-router-dom";
import TypeButton from "./ui/TypeButton";

import { useStateContext } from "../contexts/ContextProvider";

export function Navbar() {
    const { editHotel, setEditHotel } = useStateContext();

    return (
        <nav className="flex justify-between items-center bg-zinc-700 my-3 py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold tracking-tight">
                <Link to="/" onClick={(ev) => setEditHotel(false)}>HOTELES DECAMERON DE COLOMBIA</Link>
            </h1>

            {editHotel && <div className="text-center text-lg">Editando...</div>}

            {!editHotel && (
                <ul className="flex gap-x-2">
                    <li>
                        <TypeButton to="/add-hotel">Agregar Hotel</TypeButton>
                    </li>
                </ul>
            )}
        </nav>
    );
}
