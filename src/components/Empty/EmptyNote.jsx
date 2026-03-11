import React from "react";
import { FilePlus2, PlusCircle, Search, Tag } from "lucide-react";
import "../../Pages/Dashboard.css";

function EmptyNote({
  title = "No notes yet",
  subtitle = "Create your first note to start organizing ideas, tasks, and reminders.",
  buttonLabel = "Create Note",
  onCreate,
}) {
  return (
    <section className="dashboard__empty">
      <div className="dashboard__empty-inner">
        <div className="dashboard__empty-icon" aria-hidden="true">
          <FilePlus2 size={40} />
        </div>

        <h2 className="dashboard__empty-title">{title}</h2>
        <p className="dashboard__empty-subtitle">{subtitle}</p>

        <button
          type="button"
          className="dashboard__empty-btn"
          onClick={onCreate}
        >
          <PlusCircle size={18} />
          {buttonLabel}
        </button>

        <div className="dashboard__empty-links" aria-hidden="true">
          <span className="dashboard__empty-link">
            <Search size={14} />
            Search notes
          </span>
          <span className="dashboard__empty-sep">•</span>
          <span className="dashboard__empty-link">
            <Tag size={14} />
            Add tags
          </span>
        </div>
      </div>
    </section>
  );
}

export default EmptyNote;
