import React from "react";
import { useNavigate } from "react-router";
import { SearchX } from "lucide-react";
import { useDataContext } from "../context/NoteProvider";
import "./Dashboard.css";

function Favorites({ rightPane }) {
  const { notes, searchTerm } = useDataContext();
  const favoriteNotes = notes.filter((note) => note.isFavorite);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredFavorites = favoriteNotes.filter((note) => {
    if (!normalizedSearch) {
      return true;
    }

    return [note.title, note.content, note.tag, note.date]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });

  return (
    <div className="dashboard__list">
      <div className="dashboard__list-panel">
        <div className="dashboard__list-header">
          <h2 className="dashboard__list-title dashboard__folder-title">
            Favorite Notes
          </h2>
          <span className="dashboard__list-count">
            {filteredFavorites.length}
          </span>
        </div>
        <div className="dashboard__notes-scroll">
          {filteredFavorites.length === 0 ? (
            <div className="dashboard__no-results">
              <SearchX size={36} className="dashboard__no-results-icon" />
              <p>
                {normalizedSearch
                  ? "No favorite notes match your search."
                  : "No favorite notes yet."}
              </p>
            </div>
          ) : (
            filteredFavorites.map((note) => (
              <FavoriteItem key={note.id} note={note} />
            ))
          )}
        </div>
      </div>
      {rightPane ?? (
        <div className="dashboard__select-prompt">
          <h3>Open a favorite</h3>
          <p>Pick a favorite note from the left panel to edit it.</p>
        </div>
      )}
    </div>
  );
}

function FavoriteItem({ note }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/note/${note.id}`, { state: { from: window.location.pathname } });
  }
  return (
    <div className="dashboard__note-card" onClick={onClick}>
      <h3 className="dashboard__note-title">
        {note.title || "Untitled Notes"}
      </h3>
      <p className="dashboard__note-preview">{note.content || "No content"}</p>

      <div className="dashboard__note-meta">
        <span className="dashboard__note-data dashboard__note-date">
          {note.date}
        </span>
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
