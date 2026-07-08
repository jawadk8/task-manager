let currentFilter = "all";
let searchQuery = "";
let currentSort = "date-desc";

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

  const theme = loadTheme();
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  }

  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", () => {
    const title = input.value.trim();
    if (title === "") return;

    const result = addTask(title);
    if (!result) {
      alert("This task already exists.");
      return;
    }

    saveTasks();
    renderTasks();
    input.value = "";
  });

  const listEl = document.getElementById("taskListEl");

  listEl.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const id = Number(e.target.dataset.id);

    if (action === "toggle") {
      toggleComplete(id);
      saveTasks();
      renderTasks();
    }

    if (action === "delete") {
      deleteTask(id);
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

  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    saveTheme(newTheme);
  });
});