let currentFilter = "all";
let searchQuery = "";

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

  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();

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
});