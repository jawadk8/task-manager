function createTask(title) {
  return {
    id: Date.now(),
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

let taskList = [];

function addTask(title) {
  const newTask = createTask(title);
  taskList.push(newTask);
  return newTask;
}

function deleteTask(id) {
  taskList = taskList.filter(task => task.id !== id);
}

function updateTask(id, updates) {
  const task = taskList.find(task => task.id === id);
  if (task) {
    Object.assign(task, updates);
  }
  return task;
}

function toggleComplete(id) {
  const task = taskList.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  return task;
}