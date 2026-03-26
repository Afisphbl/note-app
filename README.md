# Note App

A modern React-based note-taking application focused on productivity and organization.

## Overview

This project provides a clean structure for managing notes with dedicated views for dashboard insights, favorites, shared notes, and trash management. It is built with React and designed to be easy to extend with additional note features.

## Features

- Create and manage notes
- Organize notes with tags
- Dedicated pages for Dashboard, Favorites, Notes, Share, and Trash
- Theme and settings support
- Modular component architecture for easier maintenance

## Tech Stack

- React
- React Router
- Context API for state management
- Create React App (build tooling)

## Project Structure

```text
note-app/
|-- package.json
|-- README.md
|-- public/
|   |-- index.html
|-- src/
|   |-- App.jsx
|   |-- index.css
|   |-- index.js
|   |-- components/
|   |   |-- Button/
|   |   |   |-- Button.jsx
|   |   |-- Empty/
|   |   |   |-- EmptyNote.jsx
|   |   |-- Header/
|   |   |   |-- Header.css
|   |   |   |-- Header.jsx
|   |   |-- Input/
|   |   |   |-- Input.jsx
|   |   |-- Main/
|   |   |   |-- Main.jsx
|   |   |-- Modals/
|   |   |   |-- TagManagerModal.css
|   |   |   |-- TagManagerModal.jsx
|   |   |-- Note/
|   |   |   |-- NoteEditor.css
|   |   |   |-- NoteEditor.jsx
|   |   |-- Settings/
|   |   |   |-- Settings.css
|   |   |   |-- Settings.jsx
|   |   |-- SideBar/
|   |   |   |-- Sidebar.css
|   |   |   |-- SideBar.jsx
|   |   |-- TagModel/
|   |   |   |-- TagManagerModal.css
|   |   |   |-- TagManagerModal.jsx
|   |-- context/
|   |   |-- NoteProvider.jsx
|   |   |-- ThemeProvider.jsx
|   |-- Pages/
|   |   |-- Dashboard.css
|   |   |-- DashBoard.jsx
|   |   |-- Favorites.jsx
|   |   |-- Notes.jsx
|   |   |-- Share.jsx
|   |   |-- Trash.jsx
```

## Getting Started

### Prerequisites

- Node.js (recommended: LTS)
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Available Scripts

- `npm start`: Start the development server
- `npm test`: Run tests in watch mode
- `npm run build`: Build for production
- `npm run eject`: Eject CRA configuration (irreversible)

## Future Improvements

- Add note search and advanced filtering
- Add rich text editing and markdown support
- Add drag-and-drop note organization
- Add offline mode and local caching improvements
- Add cloud sync and authentication
- Increase test coverage (unit and integration)

## Author

- Afisphbl

## License

This project is currently unlicensed. Add a license file (for example MIT) if you plan to distribute it publicly.
