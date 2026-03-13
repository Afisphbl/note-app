import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import "./TagManagerModal.css";

const DEFAULT_COLORS = [
  "#136dec",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

function TagManagerModal({
  tags = [],
  closeTagModal,
  onAddTag,
  onDeleteTag,
  presetColors = DEFAULT_COLORS,
}) {
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(presetColors[0] || "#136dec");

  function handleAdd() {
    const name = newTagName.trim();
    if (!name || !onAddTag) {
      return;
    }

    onAddTag(name, newTagColor);
    setNewTagName("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="modal-overlay" onClick={closeTagModal}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Manage Tags</h2>
          <button
            type="button"
            className="modal__close-btn"
            onClick={closeTagModal}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal__body">
          <div className="tag-form">
            <input
              type="text"
              className="tag-form__input"
              placeholder="New tag name..."
              value={newTagName}
              onChange={(event) => setNewTagName(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="color"
              className="tag-form__color"
              value={newTagColor}
              onChange={(event) => setNewTagColor(event.target.value)}
              title="Pick tag color"
            />
            <button
              type="button"
              className="tag-form__add-btn"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setNewTagColor(color)}
                title={`Use ${color}`}
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
                    <span
                      className="tag-list-item__dot"
                      style={{ backgroundColor: tag.color || "#136dec" }}
                    />
                    <span className="tag-list-item__name">{tag.name}</span>
                  </div>
                  <button
                    type="button"
                    className="tag-list-item__delete"
                    title="Delete tag"
                    onClick={() => onDeleteTag?.(tag.id)}
                  >
                    <Trash2 size={16} />
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

export default TagManagerModal;
