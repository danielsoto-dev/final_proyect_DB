import React, { useState, useContext, createContext } from 'react';
export const BlockedNRCContext = createContext(null);
export function useBlockedNRC() {
  return useContext(BlockedNRCContext);
}

export default function BlockedNRCProvider({ children }) {
  const [blockedNRC, setblockedNRC] = useState([]);

  return (
    //Si paso un objetos {}, si paso un array []
    <BlockedNRCContext.Provider value={{ blockedNRC, setblockedNRC }}>
      {children}
    </BlockedNRCContext.Provider>
  );
}
