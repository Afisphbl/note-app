import React, { memo } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  FolderIcon,
  StarIcon,
  Users2Icon,
  Trash2Icon,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

function SideBar() {
  let id = crypto.randomUUID();

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
            to={`note/${id}`}
            className="sidebar__new-note-btn"
            state={{ from: window.location.pathname }}
          >
            <PlusIcon size={16} />
            New Note
          </Link>
        </div>

        <ul className="sidebar__nav">
          <Link to="/" className="sidebar__nav-item">
            <FolderIcon size={16} />
            All Notes
          </Link>

          <Link to="favorites" className="sidebar__nav-item">
            <StarIcon size={16} />
            Favorites
          </Link>
          <Link to="shared" className="sidebar__nav-item">
            <Users2Icon size={16} />
            Shared
          </Link>
          <Link to="trash" className="sidebar__nav-item">
            <Trash2Icon size={16} />
            Trash
          </Link>
        </ul>
      </div>

      <div className="sidebar__bottom">
        <Link to="settings" className="sidebar__nav-item">
          <Settings size={16} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}

export default memo(SideBar);
