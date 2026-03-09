import React, { useEffect } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  FolderIcon,
  StarIcon,
  Users2Icon,
  Trash2Icon,
  Settings,
} from "lucide-react";
import { useDataContext } from "../../context/NoteProvider";
import Button from "../Button/Button";
import "./Sidebar.css";

function SideBar() {
  const { noteId, updateNoteId } = useDataContext();
  let activeNoteId;
  useEffect(() => {
    activeNoteId = noteId;
  }, [noteId]);

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__workspace-container">
          <div className="sidebar__workspace">
            <span className="sidebar__workspace-logo">N</span>
            <div className="sidebar__workspace-info">
              <h2 className="sidebar__workspace-name">Personal Workspace</h2>
              <p className="sidebar__workspace-plan">Free Plan</p>
            </div>
          </div>
          <Link
            to={`note/${activeNoteId}`}
            className="sidebar__new-note-btn"
            onClick={updateNoteId}
          >
            <PlusIcon size={16} />
            New Note
          </Link>
        </div>

        <ul className="sidebar__nav">
          <li className="sidebar__nav-item">
            <FolderIcon size={16} />
            All Notes
          </li>

          <li className="sidebar__nav-item">
            <StarIcon size={16} />
            Favorites
          </li>
          <li className="sidebar__nav-item">
            <Users2Icon size={16} />
            Shared
          </li>
          <li className="sidebar__nav-item">
            <Trash2Icon size={16} />
            Shared
          </li>
        </ul>
      </div>

      <div className="sidebar__bottom">
        <Button className="sidebar__nav-item">
          <Settings size={16} />
          <span>Settings</span>
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
