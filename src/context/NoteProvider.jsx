import React, { createContext, useContext, useRef, useState } from "react";

// const NoteIdContext = createContext();
const DataContext = createContext();

const sampleTags = [
  { id: "1", name: "Work", color: "#136dec" },
  { id: "2", name: "Personal", color: "#10b981" },
  { id: "3", name: "Ideas", color: "#f59e0b" },
];

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [tags, setTags] = useState(sampleTags);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const href = useRef("/");

  function updateNoteId(id) {
    setNoteId(id);
  }

  function resetNoteId() {
    setNoteId(null);
  }

  function updateHref(newHref) {
    href.current = newHref;
  }

  function toggleTagModal() {
    setIsTagModalOpen((prev) => !prev);
  }

  function closeTagModal() {
    setIsTagModalOpen(false);
  }

  function onAddTag(name, color) {
    const newTag = {
      id: Date.now(),
      name,
      style: { backgroundColor: color },
    };
    setTags((prev) => [...prev, newTag]);
  }

  function addNote(note) {
    console.log(noteId);
    const existingNoteIndex = notes.findIndex((n) => n.id === noteId);

    if (existingNoteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = { ...note, id: noteId };
      setNotes(updatedNotes);
      return;
    }

    note = { ...note, id: noteId };
    setNotes((prev) => [...prev, note]);
  }

  const value = {
    notes,
    noteId,
    href,
    updateNoteId,
    resetNoteId,
    updateHref,
    addNote,
    isTagModalOpen,
    toggleTagModal,
    closeTagModal,
    tags,
    onAddTag,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
