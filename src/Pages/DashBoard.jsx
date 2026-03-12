import { Routes, Route } from "react-router";
import { useDataContext } from "../context/NoteProvider";
import NoteEditor from "../components/Note/NoteEditor";
import EmptyNote from "../components/Empty/EmptyNote";
import Notes from "./Notes";
import Favorites from "./Favorites";
import Trash from "./Trash";

function DashBoard() {
  const { notes } = useDataContext();
  const allNotes = notes.filter((note) => !note.isTrash);
  const favoriteNotes = notes.filter(
    (note) => note.isFavorite && !note.isTrash,
  );
  const trashNotes = notes.filter((note) => note.isTrash);
  return (
    <Routes>
      <Route
        path="/"
        element={allNotes.length === 0 ? <EmptyNote /> : <Notes />}
      />

      <Route
        path="favorites"
        element={
          favoriteNotes.length === 0 ? (
            <EmptyNote
              title="No favorites yet"
              subtitle="Mark notes as favorite to find them here."
            />
          ) : (
            <Favorites />
          )
        }
      />

      <Route
        path="trash"
        element={
          trashNotes.length === 0 ? (
            <EmptyNote
              title="No trash yet"
              subtitle="Deleted notes will appear here."
            />
          ) : (
            <Trash />
          )
        }
      />
      <Route path="note/:id" element={<NoteEditor />} />
    </Routes>
  );
}

export default DashBoard;
