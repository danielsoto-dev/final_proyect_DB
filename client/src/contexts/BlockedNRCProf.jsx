import React, { useState, useContext, createContext } from 'react';
export const BlockedNRCProfContext = createContext(null);
export function useBlockedNRCProf() {
  return useContext(BlockedNRCProfContext);
}

export default function BlockedNRCProfProvider({ children }) {
  const [blockedNRCProf, setblockedNRCProf] = useState([]);

  return (
    //Si paso un objetos {}, si paso un array []
    <BlockedNRCProfContext.Provider
      value={{ blockedNRCProf, setblockedNRCProf }}
    >
      {children}
    </BlockedNRCProfContext.Provider>
  );
}
