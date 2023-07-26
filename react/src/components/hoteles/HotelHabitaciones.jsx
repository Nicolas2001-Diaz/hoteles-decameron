import { PlusIcon } from "@heroicons/react/24/outline";
import HabitacionEditor from "./HabitacionEditor";
import { useEffect, useState } from "react";

function HotelHabitaciones({ habitaciones, onHabitacionesUpdate }) {
    const [myQuestions, setMyQuestions] = useState([...habitaciones]);

    const [posicion, setPosicion] = useState(0);

    const addQuestion = (index) => {
        setPosicion(posicion+1);

        index = index !== undefined ? index : myQuestions.length;

        myQuestions.splice(index, 0, {
            id: posicion,
            cantidad: "",
            tipo: "",
            acomodacion: "",
        });

        setMyQuestions([...myQuestions]);
        onHabitacionesUpdate(myQuestions);
    };

    const questionChange = (question) => {
        if (!question) return;

        const newQuestions = myQuestions.map((q) => {
            if (q.id === question.id) {
                return { ...question };
            }

            return q;
        });

        setMyQuestions(newQuestions);
        onHabitacionesUpdate(newQuestions);
    };

    const deleteQuestion = (question) => {
        const newQuestions = myQuestions.filter((q) => q.id !== question.id);

        setMyQuestions(newQuestions);
        onHabitacionesUpdate(newQuestions);
    };

    useEffect(() => {
        setMyQuestions(habitaciones);
    }, [habitaciones]);

    return (
        <div className="md:col-span-8 bg-zinc-800 p-10 rounded-md">
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Habitaciones</h3>

                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addQuestion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Agregar Habitación
                </button>
            </div>

            {myQuestions.length ? (
                myQuestions.map((q, ind) => (
                    <HabitacionEditor
                        key={q.id}
                        index={ind}
                        habitacion={q}
                        habitacionChange={questionChange}
                        addHabitacion={addQuestion}
                        deleteHabitacion={deleteQuestion}
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
