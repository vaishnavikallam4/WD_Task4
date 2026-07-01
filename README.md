# TodoApp

A React + Vite task manager with a clean dashboard, task filters, dark and pink themes, and mobile-friendly navigation.

## Features

- Add, view, and manage tasks
- Filter tasks by all, pending, or completed
- Search tasks by title, description, or category
- Sort tasks by newest, due date, or priority
- Dashboard summary with total, pending, and due-soon counts
- Theme support: pink and dark modes
- Responsive mobile layout with a left slide-in menu
- Local persistence for tasks and theme preferences using localStorage
- Toast notifications for task actions

## Tech Stack

- React 19
- Vite
- React Router DOM
- React Toastify
- Framer Motion
- Tailwind CSS utilities
- date-fns

## Project Structure

- `src/App.jsx` — main app setup, router, and toast container
- `src/components/Layout.jsx` — navigation sidebar, theme controls, mobile menu
- `src/pages/Dashboard.jsx` — dashboard with stats, task form, and quick filters
- `src/pages/Tasks.jsx` — task list, search, and sorting controls
- `src/pages/Settings.jsx` — quick actions and summary snapshot
- `src/context/TaskContext.jsx` — task state, view/filter logic, theme persistence
- `src/App.css` — styles and theme variables

## Installation

From the `TodoApp` folder, install dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

Open the URL shown in the terminal to view the app.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Usage

- Use the dashboard form to add tasks.
- Switch between `Board` and `List` views using the topbar controls.
- Use the filter chips to show all, active, or completed tasks.
- Search and sort tasks on the Tasks page.
- Toggle between pink and dark themes.
- On mobile, use the hamburger menu to open the left navigation.

## Notes

- Tasks and theme selection persist in the browser via `localStorage`.
- The app is built with React Context for shared state management.
- The theme selector now includes only pink and dark modes.

## Improvements

Potential future additions:

- Edit and delete controls directly on task cards
- Due date reminders and notifications
- Task categories and tags
- Backend sync for cross-device persistence
