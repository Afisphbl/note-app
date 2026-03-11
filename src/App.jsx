import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import NoteEditor from "./components/Note/NoteEditor";
import Notes from "./Pages/Notes";
import Favorites from "./Pages/Favorites";
import Trash from "./Pages/Trash";

function App() {
  return (
    <BrowserRouter>
      <article className="app-container">
        <Header />
        <main className="app-main">
          <SideBar />
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="trash" element={<Trash />} />
            <Route path="note/:id" element={<NoteEditor />} />
          </Routes>
        </main>
      </article>
    </BrowserRouter>
  );
}

export default App;
