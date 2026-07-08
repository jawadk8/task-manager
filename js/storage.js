const STORAGE_KEY = "myTaskAppTasks";

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  taskList = stored ? JSON.parse(stored) : [];
}

function saveTheme(theme) {
  localStorage.setItem("myTaskAppTheme", theme);
}

function loadTheme() {
  return localStorage.getItem("myTaskAppTheme") || "light";
}