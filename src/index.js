import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeProvider";
import { NoteProvider } from "./context/NoteProvider";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
