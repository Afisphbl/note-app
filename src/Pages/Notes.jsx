import React from "react";
import { useNavigate } from "react-router";
import { useDataContext } from "../context/NoteProvider";
import "./Dashboard.css";

function Notes() {
  const { notes, updateNoteId } = useDataContext();

  return (
    <div className="dashboard__list">
      <div className="dashboard__list-panel">
        <div className="dashboard__list-header">
          <h2 className="dashboard__list-title">All Notes</h2>
          <span className="dashboard__list-count">{notes.length}</span>
        </div>
        <div className="dashboard__notes-scroll">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} updateNoteId={updateNoteId} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NoteItem({ note, updateNoteId }) {
  const navigate = useNavigate();

  function onClick() {
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

export default Notes;
