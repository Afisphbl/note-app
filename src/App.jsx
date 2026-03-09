import React from "react";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import NoteEditor from "./components/Note/NoteEditor";

function App() {
  return (
    <article className="app-container">
      <Header />
      <main className="app-main">
        <SideBar />
        <NoteEditor />
      </main>
    </article>
  );
}

export default App;
