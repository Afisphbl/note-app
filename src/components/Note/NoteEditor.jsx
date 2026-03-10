import React, { useState } from "react";
import { Link } from "react-router";
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
import TagManagerModal from "../TagModel/TagManagerModal";
import "./NoteEditor.css";

function NoteEditor() {
  const [showTagPicker, setShowTagPicker] = useState(false);
  const {
    title,
    content,
    tag,
    tags,
    href,
    noteId,
    resetNoteId,
    onTitleChange,
    onContentChange,
    onTagChange,
    addNote,
    isTagModalOpen,
    toggleTagModal,
  } = useDataContext();

  function toggleTagPicker() {
    setShowTagPicker((prev) => !prev);
  }

  function onBack() {
    const note = {
      title,
      content,
      tag,
      faviorite: false,
      shared: false,
      trash: false,
      style: {
        color: tags.find((t) => t.name === tag)?.style.backgroundColor,
        backgroundColor: `${tags.find((t) => t.name === tag)?.style.backgroundColor}20`,
      },
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    resetNoteId();
    addNote(note);
    onTitleChange("");
    onContentChange("");
  }

  return (
    <section className="editor" onClick={() => setShowTagPicker(false)}>
      <div className="editor__toolbar">
        <Link
          to={`${href.current}`}
          className="editor__toolbar-left editor__toolbar-btn"
          title="Go back to notes list"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
        </Link>

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
        title={title}
        tag={tag}
        isTagPickerVisible={showTagPicker}
        toggleTagPicker={toggleTagPicker}
        onTitleChange={onTitleChange}
        onTagChange={onTagChange}
        toggleTagModal={toggleTagModal}
        key={noteId}
      />
      <EditorBody content={content} onContentChange={onContentChange} />

      {isTagModalOpen && <TagManagerModal />}
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

function MetaBar({
  tags,
  isTagPickerVisible,
  toggleTagPicker,
  title,
  onTitleChange,
  tag,
  onTagChange,
  toggleTagModal,
}) {
  const tagColor = tags.find((t) => t.name === tag)?.color || "transparent";
  return (
    <div className="editor__metabar">
      <Input
        placeholder="Untitled Note"
        className="editor__title-input"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <div className="editor__tags-row">
        {tag && (
          <span
            className="editor__tag-chip"
            style={{ background: `${tagColor}20`, color: tagColor }}
          >
            {tag}
          </span>
        )}
        <div className="editor__tag-picker-container">
          <Button
            className="editor__add-tag-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleTagPicker();
            }}
          >
            + Add Tag
          </Button>

          {isTagPickerVisible && (
            <div className="editor__tag-picker">
              {tags.map((t) => (
                <Button
                  key={t.id}
                  className="editor__tag-picker-item"
                  onClick={() => onTagChange(t.name)}
                >
                  <span
                    className="editor__tag-picker-dot"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name}
                </Button>
              ))}
              <Button
                className="editor__tag-picker-item editor__tag-picker-item--manage"
                onClick={toggleTagModal}
              >
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

function EditorBody({ content, onContentChange }) {
  return (
    <div className="editor__body">
      <textarea
        className="editor__content"
        placeholder="Start writing your note here..."
        multiline="true"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
}

export default NoteEditor;
