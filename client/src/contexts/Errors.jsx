import React, { useState, useContext, createContext } from 'react';
export const ErrorsContext = createContext(null);

export function useErrors() {
  return useContext(ErrorsContext);
}

export default function ErrorsProvider({ children }) {
  const [errors, setErrors] = useState({});

  return (
    //Si paso un objetos {}, si paso un array []
    <ErrorsContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorsContext.Provider>
  );
}
