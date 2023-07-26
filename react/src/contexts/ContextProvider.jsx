import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    tiposHabitacion: [],
    acomodaciones: [],
    toast: {
        message: null,
        show: false,
    },
});

export const ContextProvider = ({ children }) => {
    const [tiposHabitacion] = useState([{id: 1 , tipo: "Estándar"}, {id: 2 , tipo: "Junior"}, {id: 3 , tipo: "Suite"}]);

    const [acomodaciones] = useState([{id: 1 , acomodacion: "Sencilla"}, {id: 2 , acomodacion: "Doble"}, {id: 3 , acomodacion: "Triple"}, {id: 4 , acomodacion: "Cuádruple"}]);

    const [toast, setToast] = useState({ message: "", show: false });
    const [editHotel, setEditHotel] = useState(true);

    const showToast = (message) => {
        setToast({ message, show: true });

        setTimeout(() => {
            setToast({ message: "", show: false });
        }, 5000);
    };

    return (
        <stateContext.Provider
            value={{
                toast,
                editHotel,
                tiposHabitacion,
                acomodaciones,
                showToast,
                setEditHotel,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
