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

    if (editingTaskId === task.id) {
      li.classList.add("editing");

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = task.title;
      titleInput.maxLength = 100;
      titleInput.dataset.editField = "title";

      const descInput = document.createElement("input");
      descInput.type = "text";
      descInput.value = task.description || "";
      descInput.placeholder = "Add a description (optional)";
      descInput.dataset.editField = "description";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.dataset.action = "save-edit";
      saveBtn.dataset.id = task.id;

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.dataset.action = "cancel-edit";

      const editFields = document.createElement("div");
      editFields.classList.add("edit-fields");
      editFields.appendChild(titleInput);
      editFields.appendChild(descInput);

      const editActions = document.createElement("div");
      editActions.classList.add("edit-actions");
      editActions.appendChild(saveBtn);
      editActions.appendChild(cancelBtn);

      li.appendChild(editFields);
      li.appendChild(editActions);
      listEl.appendChild(li);
      return;
    }

    const textWrap = document.createElement("div");
    textWrap.classList.add("task-text");

    const span = document.createElement("span");
    span.textContent = task.title;
    if (task.completed) {
      span.style.textDecoration = "line-through";
    }
    textWrap.appendChild(span);

    if (task.description) {
      const descEl = document.createElement("p");
      descEl.classList.add("task-description");
      descEl.textContent = task.description;
      textWrap.appendChild(descEl);
    }

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.dataset.action = "toggle";
    completeBtn.dataset.id = task.id;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = task.id;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = task.id;

    const actions = document.createElement("div");
    actions.classList.add("task-actions");
    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(textWrap);
    li.appendChild(actions);
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