import React, { useState } from "react";
import {
  ArrowLeft,
  StarIcon,
  Trash2Icon,
  SettingsIcon,
  CheckCircle2,
} from "lucide-react";
import { useDataContext } from "../../context/NoteProvider";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./NoteEditor.css";

const sampleTags = [
  { id: 1, name: "Work", style: { backgroundColor: "blue" } },
  { id: 2, name: "Personal", style: { backgroundColor: "green" } },
  { id: 3, name: "Ideas", style: { backgroundColor: "yellow" } },
];

function NoteEditor() {
  const [tags, setTags] = useState(sampleTags);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const { resetNoteId } = useDataContext();

  function toggleTagPicker() {
    setShowTagPicker((prev) => !prev);
  }
  return (
    <section className="editor">
      <div className="editor__toolbar">
        <Button
          className="editor__toolbar-left editor__toolbar-btn"
          title="Go back to notes list"
          onClick={resetNoteId}
        >
          <ArrowLeft size={16} />
        </Button>

        <div className="editor__toolbar-right">
          <Button className="editor__toolbar-btn" title="Add to favorites">
            <StarIcon size={16} />
          </Button>
          <Button
            className="editor__action-btn editor__action-btn--ghost editor__action-btn--danger"
            title="Delete note"
          >
            <Trash2Icon size={16} />
          </Button>
        </div>
      </div>

      <MetaBar
        tags={tags}
        isTagPickerVisible={showTagPicker}
        toggleTagPicker={toggleTagPicker}
      />
      <EditorBody />

      <div className="editor__statusbar">
        <span>0 words</span>
        <div className="editor__statusbar-saved">
          <CheckCircle2 size={16} />
          saved
        </div>
      </div>
    </section>
  );
}

function MetaBar({ tags, isTagPickerVisible, toggleTagPicker }) {
  return (
    <div className="editor__metabar">
      <Input placeholder="Untitled Note" className="editor__title-input" />
      <div className="editor__tags-row">
        <div className="editor__tag-picker-container">
          <Button className="editor__add-tag-btn" onClick={toggleTagPicker}>
            + Add Tag
          </Button>

          {isTagPickerVisible && (
            <div className="editor__tag-picker">
              {tags.map((tag) => (
                <Button key={tag.id} className="editor__tag-picker-item">
                  <span className="editor__tag-picker-dot" style={tag.style} />
                  {tag.name}
                </Button>
              ))}
              <Button className="editor__tag-picker-item editor__tag-picker-item--manage">
                <SettingsIcon size={16} />
                Manage Tags
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EditorBody() {
  return (
    <div className="editor__body">
      <textarea
        className="editor__content"
        placeholder="Start writing your note here..."
        multiline
      />
    </div>
  );
}

export default NoteEditor;
