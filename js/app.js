document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();

  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", () => {
    const title = input.value.trim();
    if (title === "") return;

    addTask(title);
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
});