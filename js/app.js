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
});