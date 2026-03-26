import React from "react";
import { BrowserRouter } from "react-router";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import DashBoard from "./Pages/DashBoard";
import { ThemeProvider } from "./context/ThemeProvider";
import Main from "./components/Main/Main";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <article className="app-container">
          <Header />
          <Main>
            <SideBar />
            <DashBoard />
          </Main>
        </article>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
