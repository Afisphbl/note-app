import React, { createContext, useContext, useEffect, useState } from "react";

// const NoteIdContext = createContext();
const DataContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteId, setNoteId] = useState(null);

  function updateNoteId() {
    const id = crypto.randomUUID();
    setNoteId(id);
  }

  function resetNoteId() {
    setNoteId(null);
  }

  const value = {
    noteId,
    updateNoteId,
    resetNoteId,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
