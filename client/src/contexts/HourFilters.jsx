import React, { useState, useContext, createContext } from 'react';
export const HourFiltersContext = createContext(null);

export function useHourFilters() {
  return useContext(HourFiltersContext);
}

export default function HourFiltersProvider({ children }) {
  const [hourFilters, setHourFilters] = useState([]);

  return (
    //Si paso un objetos {}, si paso un array []
    <HourFiltersContext.Provider value={{ hourFilters, setHourFilters }}>
      {children}
    </HourFiltersContext.Provider>
  );
}
