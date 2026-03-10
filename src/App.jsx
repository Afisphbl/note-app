import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import NoteEditor from "./components/Note/NoteEditor";
import Notes from "./Pages/Notes";

function App() {
  return (
    <BrowserRouter>
      <article className="app-container">
        <Header />
        <main className="app-main">
          <SideBar />
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="note/:id" element={<NoteEditor />} />
          </Routes>
        </main>
      </article>
    </BrowserRouter>
  );
}

export default App;
