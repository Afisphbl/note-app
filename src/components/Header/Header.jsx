import React from "react";
import {
  Notebook,
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellRing,
} from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import Button from "../Button/Button";
import Input from "../Input/Input";

import "./Header.css";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__brand">
        <Notebook size={24} className="header__brand-icon " />
        <h1 className="header__brand-title">Notes App</h1>
      </div>

      <div className="header__actions">
        <div className="header__search">
          <SearchIcon size={16} className="header__search-icon" />
          <Input type="search" placeholder="Search notes..." />
        </div>

        <Button className="header__icon-btn" onClick={toggleTheme}>
          {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={20} />}
        </Button>
        <Button className="header__icon-btn">
          <BellRing size={16} />
        </Button>

        <div className="header__avatar">
          <span>JD</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
