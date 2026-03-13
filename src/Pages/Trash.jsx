import React from "react";
import { useNavigate } from "react-router";
import { ArchiveRestore, SearchX } from "lucide-react";
import { useDataContext } from "../context/NoteProvider";
import "./Dashboard.css";

function Trash({ rightPane }) {
  const { notes, restoreNote } = useDataContext();
  const trashNotes = notes.filter((note) => note.isTrash);

  return (
    <div className="dashboard__list">
      <div className="dashboard__list-panel">
        <div className="dashboard__list-header">
          <h2 className="dashboard__list-title dashboard__folder-title">
            Trash
          </h2>
          <span className="dashboard__list-count">{trashNotes.length}</span>
        </div>
        <div className="dashboard__notes-scroll">
          {trashNotes.length === 0 ? (
            <div className="dashboard__no-results">
              <SearchX size={36} className="dashboard__no-results-icon" />
              <p>Trash is empty.</p>
            </div>
          ) : (
            trashNotes.map((note) => (
              <TrashItem key={note.id} note={note} restoreNote={restoreNote} />
            ))
          )}
        </div>
      </div>
      {rightPane ?? (
        <div className="dashboard__select-prompt">
          <h3>Review trashed notes</h3>
          <p>Open a note to restore it or delete it permanently.</p>
        </div>
      )}
    </div>
  );
}

function TrashItem({ note, restoreNote }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/note/${note.id}`, { state: { from: window.location.pathname } });
  }

  function onRestore(event) {
    event.stopPropagation();
    restoreNote(note.id);
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
      <button
        type="button"
        className="dashboard__restore-btn"
        onClick={onRestore}
      >
        <ArchiveRestore size={14} />
        Restore
      </button>
    </div>
  );
}

export default Trash;
