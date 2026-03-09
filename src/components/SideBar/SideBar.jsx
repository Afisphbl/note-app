import React from "react";
import {
  PlusIcon,
  FolderIcon,
  StarIcon,
  Users2Icon,
  Trash2Icon,
  Settings,
} from "lucide-react";
import Button from "../Button/Button";
import "./Sidebar.css";

function SideBar() {
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

          <Button className="sidebar__new-note-btn">
            <PlusIcon size={16} />
            New Note
          </Button>
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
