import React, { createContext, useContext, useEffect, useState } from "react";

// const NoteIdContext = createContext();
const DataContext = createContext();
const NOTES_STORAGE_KEY = "notes-app:notes";

function getStoredNotes() {
  try {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!savedNotes) {
      return [];
    }

    const parsedNotes = JSON.parse(savedNotes);
    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch {
    return [];
  }
}

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(getStoredNotes);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(note) {
    const nextNote = {
      id: note.id ?? crypto.randomUUID(),
      title: note.title ?? "",
      content: note.content ?? "",
      tag: note.tag ?? "",
      isFavorite: note.isFavorite ?? false,
      isTrash: note.isTrash ?? false,
      shared: note.shared ?? false,
      style: note.style ?? {},
      date:
        note.date ??
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    };

    setNotes((prev) => [...prev, nextNote]);
  }

  function deleteNote(id) {
    setNotes((prev) => {
      const target = prev.find((note) => note.id === id);

      if (!target) {
        return prev;
      }

      if (target.isTrash) {
        return prev.filter((note) => note.id !== id);
      }

      return prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isTrash: true,
              isFavorite: false,
            }
          : note,
      );
    });
  }

  function restoreNote(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isTrash: false,
            }
          : note,
      ),
    );
  }

  function toggleFavorite(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isFavorite: !note.isFavorite,
              isTrash: false,
            }
          : note,
      ),
    );
  }

  function updateNote(id, updates) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
            }
          : note,
      ),
    );
  }

  const value = {
    notes,
    addNote,
    deleteNote,
    restoreNote,
    toggleFavorite,
    updateNote,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
