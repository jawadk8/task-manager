function renderTasks() {
  const listEl = document.getElementById("taskListEl");
  listEl.innerHTML = "";

getFilteredTasks().forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title;
    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.dataset.action = "toggle";
    completeBtn.dataset.id = task.id;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = task.id;

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  });
}