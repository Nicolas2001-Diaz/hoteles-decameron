import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">
                <Link to="/">Administrador de Hoteles</Link>
            </h1>

            <ul className="flex gap-x-2">
                <li>
                    <Link
                        to="/add-hotel"
                        className="bg-indigo-500 px-4 py-1 rounded-md"
                    >
                        Agregar Hotel
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
