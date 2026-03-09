import React from "react";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <article className="app-container">
      <Header />
      <main className="app-main">
        <SideBar />
      </main>
    </article>
  );
}

export default App;
