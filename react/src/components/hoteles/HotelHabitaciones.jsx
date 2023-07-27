import { PlusIcon } from "@heroicons/react/24/outline";
import HabitacionEditor from "./HabitacionEditor";
import { useEffect, useState } from "react";

function HotelHabitaciones({ habitaciones, onHabitacionesUpdate }) {
    const [misHabitaciones, setMisHabitaciones] = useState([...habitaciones]);

    const [posicion, setPosicion] = useState(0);

    const addHabitacion = (index) => {
        setPosicion(posicion+1);

        index = index !== undefined ? index : misHabitaciones.length;

        misHabitaciones.splice(index, 0, {
            id: posicion,
            cantidad: "",
            tipo: "",
            acomodacion: "",
        });

        setMisHabitaciones([...misHabitaciones]);
        onHabitacionesUpdate(misHabitaciones);
    };

    const habitacionChange = (habitacion) => {
        if (!habitacion) return;

        const newHabitaciones = misHabitaciones.map((q) => {
            if (q.id === habitacion.id) {
                return { ...habitacion };
            }

            return q;
        });

        setMisHabitaciones(newHabitaciones);
        onHabitacionesUpdate(newHabitaciones);
    };

    const deleteHabitacion = (habitacion) => {
        const newHabitaciones = misHabitaciones.filter((q) => q.id !== habitacion.id);

        setMisHabitaciones(newHabitaciones);
        onHabitacionesUpdate(newHabitaciones);
    };

    useEffect(() => {
        setMisHabitaciones(habitaciones);
    }, [habitaciones]);

    return (
        <div className="md:col-span-8 bg-zinc-800 p-10 rounded-md">
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Habitaciones</h3>

                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addHabitacion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Agregar Habitación
                </button>
            </div>

            {misHabitaciones.length ? (
                misHabitaciones.map((q, ind) => (
                    <HabitacionEditor
                        key={q.id}
                        index={ind}
                        habitacion={q}
                        habitacionChange={habitacionChange}
                        addHabitacion={addHabitacion}
                        deleteHabitacion={deleteHabitacion}
                    />
                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    Este hotel no tiene habitaciones creadas
                </div>
            )}
        </div>
    );
}

export default HotelHabitaciones;
