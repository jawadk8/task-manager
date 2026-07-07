function renderTasks() {
  const listEl = document.getElementById("taskListEl");
  listEl.innerHTML = "";

  taskList.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    listEl.appendChild(li);
  });
}