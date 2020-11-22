import React, { useState, useContext, createContext } from 'react';
export const LectureSelectionsContext = createContext(null);

export function useLectureSelections() {
  return useContext(LectureSelectionsContext);
}

export default function LectureSelectionsProvider({ children }) {
  const [lectureSelections, setLectureSelections] = useState([]);

  return (
    //Si paso un objetos {}, si paso un array []
    <LectureSelectionsContext.Provider
      value={{ lectureSelections, setLectureSelections }}
    >
      {children}
    </LectureSelectionsContext.Provider>
  );
}
