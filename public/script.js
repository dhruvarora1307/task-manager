const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function fetchTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(addTaskToDOM);
}

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">${task.title}</span>
    <div>
      <button onclick="toggleComplete('${task._id}', ${!task.completed})">✓</button>
      <button onclick="deleteTask('${task._id}')">🗑️</button>
    </div>`;
  taskList.appendChild(li);
}

taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: taskInput.value, completed: false }),
  });
  const newTask = await res.json();
  addTaskToDOM(newTask);
  taskInput.value = '';
};

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
}

async function toggleComplete(id, completed) {
  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  fetchTasks();
}

fetchTasks();