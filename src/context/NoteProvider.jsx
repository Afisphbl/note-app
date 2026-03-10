import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// const NoteIdContext = createContext();
const DataContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteId, setNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
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

  function addNote(note) {
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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
