import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// const NoteIdContext = createContext();
const DataContext = createContext();

const sampleTags = [
  { id: 1, name: "Work", style: { backgroundColor: "blue" } },
  { id: 2, name: "Personal", style: { backgroundColor: "green" } },
  { id: 3, name: "Ideas", style: { backgroundColor: "yellow" } },
];

export const NoteProvider = ({ children }) => {
  const [noteId, setNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(sampleTags);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const href = useRef();

  function updateNoteId(id) {
    setNoteId(id);
  }

  function resetNoteId() {
    setNoteId(null);
  }

  function updateHref(newHref) {
    href.current = newHref;
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
    title,
    content,
    tag,
    href,
    updateNoteId,
    resetNoteId,
    updateHref,
    addNote,
    onTitleChange,
    onContentChange,
    onTagChange,
    isTagModalOpen,
    toggleTagModal,
    closeTagModal,
    tags,
    onAddTag,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
