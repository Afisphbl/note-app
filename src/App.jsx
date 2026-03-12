import React from "react";
import { BrowserRouter } from "react-router";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import DashBoard from "./Pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <article className="app-container">
        <Header />
        <main className="app-main">
          <SideBar />
          <DashBoard />
        </main>
      </article>
    </BrowserRouter>
  );
}

export default App;
