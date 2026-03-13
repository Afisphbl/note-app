import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import "./Settings.css";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [compactEditor, setCompactEditor] = useState(false);
  const [showWordCount, setShowWordCount] = useState(true);
  const [dateFormat, setDateFormat] = useState("short");

  function onClearLocalData() {
    localStorage.removeItem("notes-app:notes");
    localStorage.removeItem("notes-app:theme");
    window.location.reload();
  }

  return (
    <section className="settings">
      <div className="settings__inner">
        <h1 className="settings__page-title">Settings</h1>
        <p className="settings__page-subtitle">
          Customize your notes workspace experience.
        </p>

        <div className="settings__section">
          <h2 className="settings__section-title">Appearance</h2>
          <div className="settings__card">
            <div className="settings__row">
              <div className="settings__row-label">
                <span className="settings__row-label-text">Dark mode</span>
                <span className="settings__row-label-desc">
                  Switch between light and dark theme.
                </span>
              </div>
              <label className="toggle" aria-label="Toggle dark mode">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <span className="toggle__track" />
              </label>
            </div>

            <div className="settings__row">
              <div className="settings__row-label">
                <span className="settings__row-label-text">Date format</span>
                <span className="settings__row-label-desc">
                  Choose how note dates are shown.
                </span>
              </div>
              <select
                className="settings__select"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="short">Short</option>
                <option value="long">Long</option>
                <option value="relative">Relative</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings__section">
          <h2 className="settings__section-title">Editor</h2>
          <div className="settings__card">
            <div className="settings__row">
              <div className="settings__row-label">
                <span className="settings__row-label-text">Compact editor</span>
                <span className="settings__row-label-desc">
                  Use tighter spacing while writing notes.
                </span>
              </div>
              <label className="toggle" aria-label="Toggle compact editor">
                <input
                  type="checkbox"
                  checked={compactEditor}
                  onChange={(e) => setCompactEditor(e.target.checked)}
                />
                <span className="toggle__track" />
              </label>
            </div>

            <div className="settings__row">
              <div className="settings__row-label">
                <span className="settings__row-label-text">Word count</span>
                <span className="settings__row-label-desc">
                  Show or hide the note word counter.
                </span>
              </div>
              <label className="toggle" aria-label="Toggle word count">
                <input
                  type="checkbox"
                  checked={showWordCount}
                  onChange={(e) => setShowWordCount(e.target.checked)}
                />
                <span className="toggle__track" />
              </label>
            </div>
          </div>
        </div>

        <div className="settings__section">
          <h2 className="settings__section-title">Danger Zone</h2>
          <div className="settings__card">
            <div className="settings__row">
              <div className="settings__row-label">
                <span className="settings__row-label-text">
                  Reset local data
                </span>
                <span className="settings__row-label-desc">
                  Remove saved notes and theme from this browser.
                </span>
              </div>
              <button
                type="button"
                className="settings__danger-btn"
                onClick={onClearLocalData}
              >
                <AlertTriangle size={16} />
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
