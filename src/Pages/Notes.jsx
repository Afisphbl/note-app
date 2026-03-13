import React from "react";
import { useNavigate } from "react-router";
import { SearchX } from "lucide-react";
import { useDataContext } from "../context/NoteProvider";
import "./Dashboard.css";

function Notes({ rightPane }) {
  const { notes, searchTerm } = useDataContext();
  const allNotes = notes.filter((note) => !note.isTrash);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredNotes = allNotes.filter((note) => {
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
            All Notes
          </h2>
          <span className="dashboard__list-count">{filteredNotes.length}</span>
        </div>
        <div className="dashboard__notes-scroll">
          {filteredNotes.length === 0 ? (
            <div className="dashboard__no-results">
              <SearchX size={36} className="dashboard__no-results-icon" />
              <p>
                {normalizedSearch
                  ? "No notes match your search."
                  : "No notes available right now."}
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => <NoteItem key={note.id} note={note} />)
          )}
        </div>
      </div>
      {rightPane ?? (
        <div className="dashboard__select-prompt">
          <h3>Select a note</h3>
          <p>Choose a note from the list to view and edit its content.</p>
        </div>
      )}
    </div>
  );
}

function NoteItem({ note }) {
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

export default Notes;
