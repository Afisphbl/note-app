import React from "react";
import { useNavigate } from "react-router";
import { useDataContext } from "../context/NoteProvider";
import "./Dashboard.css";

function Favorites() {
  const { notes, updateNoteId, updateHref } = useDataContext();
  const favoriteNotes = notes.filter((note) => note.isFavorite);

  return (
    <div className="dashboard__list">
      <div className="dashboard__list-panel">
        <div className="dashboard__list-header">
          <h2 className="dashboard__list-title">Favorite Notes</h2>
          <span className="dashboard__list-count">{favoriteNotes.length}</span>
        </div>
        <div className="dashboard__notes-scroll">
          {favoriteNotes.map((note) => (
            <FavoriteItem
              key={note.id}
              note={note}
              updateNoteId={updateNoteId}
              updateHref={updateHref}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FavoriteItem({ note, updateNoteId, updateHref }) {
  const navigate = useNavigate();

  function onClick() {
    updateHref(window.location.pathname);
    updateNoteId(note.id);
    navigate(`/note/${note.id}`);
  }
  return (
    <div className="dashboard__note-card" onClick={onClick}>
      <h3 className="dashboard__note-title">
        {note.title || "Untitled Notes"}
      </h3>
      <p className="dashboard__note-preview">{note.content || "No content"}</p>

      <div className="dashboard__note-meta">
        <span className="dashboard__note-data">{note.date}</span>
        <div className="dashboard__note-tags">
          <span className="dashboard__note-tag" style={note.style}>
            {note.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
