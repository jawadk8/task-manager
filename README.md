# Task Manager

A working task manager built using HTML, CSS, and JavaScript. Built as a project for my Hexler Tech Bootcamp/Internship.

**Live Demo:** [https://jawadk8.github.io/task-manager/](https://jawadk8.github.io/task-manager/)

## Tech Stack

Built using:

- HTML
- CSS
- Javascript
- Git/Github

## Features

Consists of the following features:

- Add new tasks with an optional description
- Mark tasks as completed (with a satisfying completion animation)
- Edit existing tasks (title and description)
- Delete individual tasks
- Duplicate task prevention
- Search tasks in real time
- Filter tasks by All / Active / Completed
- Sort tasks by newest, oldest, or alphabetically
- Visual progress bar showing completion percentage
- Dark/light theme toggle with saved preference
- Keyboard shortcuts (Ctrl+Enter to add, "/" to search, Esc to clear search)
- Form validation (empty and duplicate task prevention, character limit)
- Empty state handling ("No tasks found")
- Tasks and theme preference saved using Local Storage
- Fully responsive design for desktop and mobile
- Clean, modern interface with custom color system and typography

## Folder Structure

```
task-manager/
├── css/       (style.css)
├── js/        (app.js, storage.js, tasks.js, ui.js)
└── index.html
```

## How to Run Locally

1. Clone the repository:

```bash
   git clone https://github.com/jawadk8/task-manager.git
```

2. Navigate into the project folder:

```bash
   cd task-manager
```

3. Open `index.html` directly in your browser, **or** for the best experience (auto-reload on changes), use the "Live Server" extension in VS Code:
   - Right-click `index.html`
   - Select "Open with Live Server"

No build step or dependencies are required — this is a static site built with plain HTML, CSS, and Javascript.

## Credits

- Built from scratch by Jawad Faiz
- With the help of Talha and Haseeb
- Built with guidance from Claude (Anthropic) for code, review, debugging and Bootstrap implementation; all code reviewed and understood by the author.
