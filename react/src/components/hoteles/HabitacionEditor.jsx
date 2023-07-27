import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

function HabitacionEditor({
    index = 0,
    habitacion,
    addHabitacion,
    deleteHabitacion,
    habitacionChange,
}) {
    const [model, setModel] = useState({ ...habitacion });
    const [tiposHabitacion, setTiposHabitacion] = useState([]);
    const [acomodaciones, setAcomodaciones] = useState([]);

    function onTipoHabitacionChange(ev) {
        const newModel = {
            ...model,
            tipo: ev.target.value,
        };

        setModel(newModel);

        getAcomodaciones(ev.target.value);
    }

    function getTipoHabitaciones() {
        axiosClient.get("/tipo-habitaciones").then(({ data }) => {
            setTiposHabitacion(data.data);
        });
    }

    function getAcomodaciones(tipoHabitacion) {
        axiosClient.get(`/acomodaciones/${tipoHabitacion}`).then(({ data }) => {
            setAcomodaciones(data.data);
        });
    }

    useEffect(() => {
        habitacionChange(model);
    }, [model]);

    useEffect(() => {
        getTipoHabitaciones();

        if(model.tipo){
            getAcomodaciones(model.tipo);
        }
    }, []);

    function onAcomodacionChange(ev) {
        const newModel = {
            ...model,
            acomodacion: ev.target.value,
        };

        setModel(newModel);
    }

    return (
        <>
            <div>
                <div className="flex justify-between my-3">
                    <h4>
                        {index + 1}.
                    </h4>

                    <div className="flex items-center">
                        <button
                            type="button"
                            className="
                            flex
                            items-center
                            text-xs
                            py-1
                            px-3
                            mr-2
                            rounded-sm
                            text-white
                            bg-gray-600
                            hover:bg-gray-700"
                            onClick={() => addHabitacion(index + 1)}
                        >
                            <PlusIcon className="w-4" />
                            add
                        </button>

                        <button
                            type="button"
                            className="
                            flex
                            items-center
                            text-xs
                            py-1
                            px-3
                            rounded-sm
                            border border-transparent
                            text-red-500
                            hover:border-red-600
                            font-semibold
                            "
                            onClick={() => deleteHabitacion(habitacion)}
                        >
                            <TrashIcon className="w-4" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex gap-1 justify-between items-center mb-3">
                    {/* Question Text */}
                    <div>
                        <label
                            htmlFor="cantidad"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Cantidad de habitaciones de este tipo
                        </label>

                        <input
                            type="number"
                            name="cantidad"
                            placeholder="99"
                            value={model.cantidad}
                            onChange={(ev) =>
                                setModel({
                                    ...model,
                                    cantidad: ev.target.value,
                                })
                            }
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        />
                    </div>
                    {/* Question Text */}

                    {/* Question Type */}
                    <div>
                        <label
                            htmlFor="tipo"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Tipo de habitación
                        </label>

                        <select
                            id="tipo"
                            name="tipo"
                            value={model.tipo}
                            onChange={onTipoHabitacionChange}
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        >
                            <option value="">Seleccione</option>

                            {tiposHabitacion.map((tipo) => (
                                <option value={tipo.id} key={tipo.id}>
                                    {tipo.tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Question Type */}

                    {/* Question Type */}
                    <div>
                        <label
                            htmlFor="acomodacion"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Tipo de acomodacion
                        </label>

                        <select
                            id="acomodacion"
                            name="acomodacion"
                            value={model.acomodacion}
                            onChange={onAcomodacionChange}
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        >
                            <option value="">Seleccione</option>

                            {acomodaciones.map((acomodacion) => (
                                <option
                                    value={acomodacion.id}
                                    key={acomodacion.id}
                                >
                                    {acomodacion.acomodacion}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Question Type */}
                </div>
            </div>

            <hr />
        </>
    );
}

export default HabitacionEditor;
