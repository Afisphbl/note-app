import React, { useState } from "react";
import { useDataContext } from "../../context/NoteProvider";
import "./TagManagerModal.css";

const TAG_COLORS = [
  "#136dec",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function TagManagerModal() {
  const { tags, toggleTagModal, closeTagModal, onAddTag } = useDataContext();
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0]);

  const handleAdd = () => {
    const name = newTagName.trim();
    if (!name) return;
    onAddTag(name, newTagColor);
    setNewTagName("");
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") handleAdd();
  // };

  return (
    <div className="modal-overlay" onClick={closeTagModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Manage Tags</h2>
          <button className="modal__close-btn" onClick={closeTagModal}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              close
            </span>
          </button>
        </div>

        <div className="modal__body">
          {/* Add Tag form */}
          <div className="tag-form">
            <input
              className="tag-form__input"
              type="text"
              placeholder="New tag name..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              // onKeyDown={handleKeyDown}
            />
            <input
              className="tag-form__color"
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              title="Pick tag color"
            />
            <button className="tag-form__add-btn" onClick={handleAdd}>
              Add
            </button>
          </div>

          {/* Color presets */}
          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            {TAG_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setNewTagColor(color)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: color,
                  border:
                    newTagColor === color
                      ? "2px solid var(--text-main)"
                      : "2px solid transparent",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Tag list */}
          <p className="tag-list-label">Existing Tags</p>
          <div className="tag-list">
            {tags.length === 0 ? (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  textAlign: "center",
                  padding: "1rem 0",
                }}
              >
                No tags yet. Create one above!
              </p>
            ) : (
              tags.map((tag) => (
                <div key={tag.id} className="tag-list-item">
                  <div className="tag-list-item__left">
                    <span className="tag-list-item__dot" style={tag.style} />
                    <span className="tag-list-item__name">{tag.name}</span>
                  </div>
                  <button className="tag-list-item__delete" title="Delete tag">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 18 }}
                    >
                      delete
                    </span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
