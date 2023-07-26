import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    toast: {
      message: null,
      show: false,
    }
  });

  export const ContextProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: "", show: false });
  
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
          showToast,
        }}
      >
        {children}
      </stateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(stateContext);