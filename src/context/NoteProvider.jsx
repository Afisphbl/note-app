import React, { createContext, useContext, useEffect, useState } from "react";

// const NoteIdContext = createContext();
const DataContext = createContext();

const sampleTags = [
  { id: "1", name: "Work", color: "#136dec" },
  { id: "2", name: "Personal", color: "#10b981" },
  { id: "3", name: "Ideas", color: "#f59e0b" },
];

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [tags, setTags] = useState(sampleTags);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [href, setHref] = useState("/");

  function updateNoteId(id) {
    setNoteId(id);
  }

  function resetNoteId() {
    setNoteId(null);
  }

  function updateHref(newHref) {
    setHref(newHref);
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
      color,
    };
    setTags((prev) => [...prev, newTag]);
  }

  function onTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function onContentChange(newContent) {
    setContent(newContent);
  }

  function onTagChange(newTag) {
    setTag(newTag);
  }

  function onFavoriteToggle() {
    setIsFavorite((prev) => !prev);
  }

  useEffect(() => {
    isFavorite && setIsTrash(false);
  }, [isFavorite]);

  function onTrashToggle() {
    setIsTrash((prev) => !prev);
  }

  useEffect(() => {
    isTrash && setIsFavorite(false);
  }, [isTrash]);

  function onBack() {
    const isExistingNote = notes.some((n) => n.id === noteId);
    const note = {
      title,
      content,
      tag,
      isFavorite,
      shared: false,
      isTrash,
      style: {
        color: tags.find((t) => t.name === tag)?.color,
        backgroundColor: `${tags.find((t) => t.name === tag)?.color}20`,
      },
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    addNote(note);
    if (!isExistingNote) {
      resetNoteId();
    }
    setTitle("");
    setContent("");
    setTag("");
    setIsFavorite(false);
    setIsTrash(false);
  }

  useEffect(() => {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTag(note.tag);
      setIsFavorite(note.isFavorite);
      setIsTrash(note.isTrash);
      // setNoteId(note.id);
    }
  }, [noteId, notes]);

  function addNote(note) {
    const existingNoteIndex = notes.findIndex((n) => n.id === noteId);

    if (existingNoteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = { ...note, id: noteId };
      setNotes(updatedNotes);
      return;
    }

    const newId = noteId ?? crypto.randomUUID();
    note = { ...note, id: newId };
    setNotes((prev) => [...prev, note]);
    return;
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
    onTitleChange,
    onContentChange,
    onTagChange,
    onFavoriteToggle,
    title,
    tag,
    content,
    isFavorite,
    isTrash,
    onTrashToggle,
    onBack,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
