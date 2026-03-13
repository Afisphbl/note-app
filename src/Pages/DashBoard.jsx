import { Routes, Route, useLocation } from "react-router";
import { useDataContext } from "../context/NoteProvider";
import NoteEditor from "../components/Note/NoteEditor";
import EmptyNote from "../components/Empty/EmptyNote";
import Notes from "./Notes";
import Favorites from "./Favorites";
import Trash from "./Trash";
import Settings from "../components/Settings/Settings";

function NoteEditorPane() {
  return (
    <div className="dashboard__select-prompt dashboard__select-prompt--editor">
      <NoteEditor />
    </div>
  );
}

function DashBoard() {
  const location = useLocation();
  const { notes } = useDataContext();
  const allNotes = notes.filter((note) => !note.isTrash);
  const favoriteNotes = notes.filter(
    (note) => note.isFavorite && !note.isTrash,
  );
  const trashNotes = notes.filter((note) => note.isTrash);
  const from = location.state?.from ?? "/";
  const fromEmpty = location.state?.fromEmpty === true;

  function renderEditorInSection() {
    if (fromEmpty) {
      return <NoteEditor />;
    }

    if (from.includes("/favorites")) {
      return <Favorites rightPane={<NoteEditorPane />} />;
    }

    if (from.includes("/trash")) {
      return <Trash rightPane={<NoteEditorPane />} />;
    }

    return <Notes rightPane={<NoteEditorPane />} />;
  }

  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={
            allNotes.length === 0 ? <EmptyNote /> : <Notes rightPane={null} />
          }
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
              <Favorites rightPane={null} />
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
              <Trash rightPane={null} />
            )
          }
        />
        <Route path="settings" element={<Settings />} />
        <Route path="note/:id" element={renderEditorInSection()} />
      </Routes>
    </div>
  );
}

export default DashBoard;
