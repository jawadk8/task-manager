function renderTasks() {
  const listEl = document.getElementById("taskListEl");
  listEl.innerHTML = "";
  updateFilterButtons();
  updateProgressBar();

  const tasks = getFilteredTasks();

  if (tasks.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No tasks found.";
    emptyMsg.classList.add("empty-state");
    listEl.appendChild(emptyMsg);
    return;
  }

  tasks.forEach(task => {
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

function updateFilterButtons() {
  const buttons = document.querySelectorAll("#filterButtons button");
  buttons.forEach(btn => {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active-filter");
    } else {
      btn.classList.remove("active-filter");
    }
  });
}

function updateProgressBar() {
  const total = taskList.length;
  const completed = taskList.filter(task => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const progressText = document.getElementById("progressText");
  const progressPercent = document.getElementById("progressPercent");
  const progressFill = document.getElementById("progressFill");

  progressText.textContent = `${completed} of ${total} completed`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}