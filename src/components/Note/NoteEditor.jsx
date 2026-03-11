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
    tags,
    href,
    noteId,
    isTagModalOpen,
    toggleTagModal,
    onBack,
    onFavoriteToggle,
    title,
    tag,
    onTitleChange,
    onContentChange,
    onTagChange,
    content,
  } = useDataContext();

  function toggleTagPicker() {
    setShowTagPicker((prev) => !prev);
  }

  // function onTitleChange(newTitle) {
  //   setTitle(newTitle);
  // }

  // function onContentChange(newContent) {
  //   setContent(newContent);
  // }

  // function onTagChange(newTag) {
  //   setTag(newTag);
  // }

  // useEffect(() => {
  //   const note = notes.find((n) => n.id === noteId);
  //   if (note) {
  //     setTitle(note.title);
  //     setContent(note.content);
  //     setTag(note.tag);
  //     setIsFavorite(note.isFavorite);
  //   }
  // }, [noteId, notes]);

  // function onBack() {
  //   const note = {
  //     title,
  //     content,
  //     tag,
  //     isFavorite,
  //     shared: false,
  //     trash: false,
  //     style: {
  //       color: tags.find((t) => t.name === tag)?.style.backgroundColor,
  //       backgroundColor: `${tags.find((t) => t.name === tag)?.style.backgroundColor}20`,
  //     },
  //     date: new Date().toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //     }),
  //   };
  //   resetNoteId();
  //   addNote(note);
  // }

  // function onFavoriteToggle() {
  //   setIsFavorite((prev) => !prev);
  // }

  return (
    <section className="editor" onClick={() => setShowTagPicker(false)}>
      <div className="editor__toolbar">
        <Link
          to={href}
          className="editor__toolbar-left editor__toolbar-btn"
          title="Go back to notes list"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
        </Link>

        <div className="editor__toolbar-right">
          <Button
            className="editor__toolbar-btn"
            title="Add to favorites"
            onClick={onFavoriteToggle}
          >
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
        onTitleChange={onTitleChange}
        onTagChange={onTagChange}
        isTagPickerVisible={showTagPicker}
        toggleTagPicker={toggleTagPicker}
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
  title,
  tag,
  isTagPickerVisible,
  toggleTagPicker,
  toggleTagModal,
  onTitleChange,
  onTagChange,
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
