import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [tags, setTags] = useState([
    { id: "1", name: "Work", color: "#136dec" },
    { id: "2", name: "Personal", color: "#10b981" },
    { id: "3", name: "Ideas", color: "#f59e0b" },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrash, setIsTrash] = useState(false);

  const { notes, addNote, deleteNote, toggleFavorite, updateNote } =
    useDataContext();

  function toggleTagPicker() {
    setShowTagPicker((prev) => !prev);
  }

  const note = useMemo(() => notes.find((n) => n.id === id), [notes, id]);
  const backTo = location.state?.from ?? "/";

  useEffect(() => {
    if (note) {
      setTitle(note.title ?? "");
      setContent(note.content ?? "");
      setTag(note.tag ?? "");
      setIsFavorite(Boolean(note.isFavorite));
      setIsTrash(Boolean(note.isTrash));
      return;
    }

    setTitle("");
    setContent("");
    setTag("");
    setIsFavorite(false);
    setIsTrash(false);
  }, [note, id]);

  function toggleTagModal() {
    setIsTagModalOpen((prev) => !prev);
  }

  function closeTagModal() {
    setIsTagModalOpen(false);
  }

  function onAddTag(name, color) {
    const newTag = {
      id: Date.now().toString(),
      name,
      color,
    };
    setTags((prev) => [...prev, newTag]);
  }

  function buildNotePayload() {
    const color = tags.find((t) => t.name === tag)?.color;
    return {
      title,
      content,
      tag,
      isFavorite,
      isTrash,
      shared: false,
      style: {
        color,
        backgroundColor: color ? `${color}20` : "transparent",
      },
      date: note?.date,
    };
  }

  function onFavoriteToggle() {
    setIsFavorite((prev) => !prev);
    if (note) {
      toggleFavorite(note.id);
      setIsTrash(false);
    }
  }

  function onTrashToggle() {
    setIsTrash((prev) => !prev);
    if (note && !note.isTrash) {
      deleteNote(note.id);
      setIsFavorite(false);
      return;
    }
    if (note && note.isTrash) {
      updateNote(note.id, { isTrash: false });
    }
  }

  function onBack() {
    const payload = buildNotePayload();
    if (note) {
      updateNote(note.id, payload);
    } else {
      addNote({ ...payload, id });
    }

    navigate(backTo);
  }

  return (
    <section className="editor" onClick={() => setShowTagPicker(false)}>
      <div className="editor__toolbar">
        <button
          type="button"
          className="editor__toolbar-left editor__toolbar-btn"
          title="Go back to notes list"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
        </button>

        <div className="editor__toolbar-right">
          <Button
            className="editor__toolbar-btn"
            title="Add to favorites"
            onClick={onFavoriteToggle}
          >
            <StarIcon size={16} />
          </Button>
          <Button
            className={`editor__action-btn editor__action-btn--ghost editor__action-btn--danger ${isTrash ? "active" : ""}`}
            title="Delete note"
            onClick={onTrashToggle}
          >
            <Trash2Icon size={16} />
          </Button>
        </div>
      </div>

      <MetaBar
        tags={tags}
        title={title}
        tag={tag}
        onTitleChange={setTitle}
        onTagChange={setTag}
        isTagPickerVisible={showTagPicker}
        toggleTagPicker={toggleTagPicker}
        toggleTagModal={toggleTagModal}
        key={id}
      />
      <EditorBody content={content} onContentChange={setContent} />

      {isTagModalOpen && (
        <TagManagerModal
          tags={tags}
          closeTagModal={closeTagModal}
          onAddTag={onAddTag}
        />
      )}
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
