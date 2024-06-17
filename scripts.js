document.addEventListener('DOMContentLoaded', () => {
  const getStartedButton = document.getElementById('get-started');
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');
  
  const taskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const clearCompletedButton = document.getElementById('clear-completed');
  const printTasksButton = document.getElementById('print-tasks');
  const selectAllButton = document.getElementById('select-all');

  let allSelected = false;

  getStartedButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    mainContent.style.display = 'block';
  });

  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="mark-completed">Mark as Completed</button>
      <button class="delete-task">X</button>
    `;
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();

    li.querySelector('.mark-completed').addEventListener('click', markAsCompleted);
    li.querySelector('.delete-task').addEventListener('click', deleteTask);
  }

  function markAsCompleted(e) {
    const taskItem = e.target.closest('li');
    taskItem.classList.toggle('completed');
  }

  function deleteTask(e) {
    const taskItem = e.target.closest('li');
    taskItem.remove();
  }

  clearCompletedButton.addEventListener('click', () => {
    const completedTasks = document.querySelectorAll('li.completed');
    completedTasks.forEach(task => task.remove());
  });

  selectAllButton.addEventListener('click', () => {
    const tasks = document.querySelectorAll('li');
    allSelected = !allSelected;
    tasks.forEach(task => {
      if (allSelected) {
        task.classList.add('completed');
      } else {
        task.classList.remove('completed');
      }
    });
    selectAllButton.textContent = allSelected ? 'Select All' : 'Select All';
  });

  printTasksButton.addEventListener('click', () => {
    window.print();
  });
});
