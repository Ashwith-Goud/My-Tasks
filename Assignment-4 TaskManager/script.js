const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  //tasks.forEach(task => createTask(task.text, task.completed));
  for(let i=0; i<tasks.length; i++){
    createTask(tasks[i].text , tasks[i].completed);
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(taskItem => {
    const text = taskItem.querySelector('span').textContent;
    const completed = taskItem.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Check if a task already exists
function taskExists(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  return tasks.some(task => task.text.toLowerCase() === text.toLowerCase()); 
}

function createTask(text, completed=false) {

    const li = document.createElement('li');
    li.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', saveTasks);

    const taskCont = document.createElement('span');
    taskCont.textContent = text;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');

    checkbox.onclick = saveTasks;

    removeButton.onclick = function(){
      li.remove();
      saveTasks;
    }

    li.append(checkbox, taskCont, removeButton);
    taskList.append(li);
  }
  
addTaskButton.onclick = () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    if (taskExists(taskText)) {
      alert("This task already exists!");
    } else {
      createTask(taskText);
      taskInput.value = ''; // Clear input
      saveTasks();
    }
  }
};

taskInput.onkeypress = (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
};

loadTasks();
