import React, { useState, useContext, createContext } from 'react';
export const TeachersFiltersContext = createContext(null);

export function useLectureSelections() {
  return useContext(TeachersFiltersContext);
}

export default function LectureSelectionsProvider({ children }) {
  const [teachersFilters, setTeachersFilters] = useState([]);

  return (
    //Si paso un objetos {}, si paso un array []
    <TeachersFiltersContext.Provider
      value={{ teachersFilters, setTeachersFilters }}
    >
      {children}
    </TeachersFiltersContext.Provider>
  );
}
