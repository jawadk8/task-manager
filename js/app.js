let currentFilter = "all";
let searchQuery = "";
let currentSort = "date-desc";
let editingTaskId = null;

function getFilteredTasks() {
  let result = taskList;

  if (currentFilter === "active") {
    result = result.filter(task => !task.completed);
  }
  if (currentFilter === "completed") {
    result = result.filter(task => task.completed);
  }

  if (searchQuery.trim() !== "") {
    result = result.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (currentSort === "date-desc") {
    result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (currentSort === "date-asc") {
    result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  if (currentSort === "alpha-asc") {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();

  const themeToggle = document.getElementById("themeToggle");

  const theme = loadTheme();
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
  }

  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const descInput = document.getElementById("taskDescInput");

  addBtn.addEventListener("click", () => {
    const title = input.value.trim();
    const description = descInput.value.trim();

    if (title === "") {
      alert("Task cannot be empty.");
      return;
    }

    if (title.length > 100) {
      alert("Task is too long (max 100 characters).");
      return;
    }

    const result = addTask(title, description);
    if (!result) {
      alert("This task already exists.");
      return;
    }

    saveTasks();
    renderTasks();
    input.value = "";
    descInput.value = "";
  });

  const listEl = document.getElementById("taskListEl");

  listEl.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const id = Number(e.target.dataset.id);

    if (action === "toggle") {
      const task = toggleComplete(id);
      saveTasks();
      renderTasks();

      if (task && task.completed) {
        const updatedLi = document.querySelector(`button[data-id="${id}"]`).closest("li");
        updatedLi.classList.add("completing");
        setTimeout(() => updatedLi.classList.remove("completing"), 400);
      }
    }

    if (action === "delete") {
      deleteTask(id);
      saveTasks();
      renderTasks();
    }

    if (action === "edit") {
      editingTaskId = id;
      renderTasks();
    }

    if (action === "cancel-edit") {
      editingTaskId = null;
      renderTasks();
    }

    if (action === "save-edit") {
      const li = e.target.closest("li");
      const titleInput = li.querySelector('[data-edit-field="title"]');
      const descInput = li.querySelector('[data-edit-field="description"]');

      const newTitle = titleInput.value.trim();

      if (newTitle === "") {
        alert("Task cannot be empty.");
        return;
      }

      updateTask(id, {
        title: newTitle,
        description: descInput.value.trim()
      });

      editingTaskId = null;
      saveTasks();
      renderTasks();
    }
  });

  const filterButtons = document.getElementById("filterButtons");

  filterButtons.addEventListener("click", (e) => {
    if (!e.target.dataset.filter) return;
    currentFilter = e.target.dataset.filter;
    renderTasks();
  });

  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    renderTasks();
  });

  const sortSelect = document.getElementById("sortSelect");

  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    renderTasks();
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    saveTheme(isDark ? "dark" : "light");
  });

  input.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      addBtn.click();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }

    if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      searchQuery = "";
      renderTasks();
    }
  });
});