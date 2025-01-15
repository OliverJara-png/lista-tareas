const apiUrl = 'http://localhost:5000/api/tasks';

const categories = [
  { title: 'Compras', img: 'shopping.png' },
  { title: 'Trabajo', img: 'briefcase.png' },
  { title: 'Salud', img: 'healthcare.png' },
  { title: 'Fitness', img: 'dumbbell.png' },
  { title: 'Educacion', img: 'education.png' },
  { title: 'Finanzas', img: 'saving.png' },
];

let tasks = [];
let selectedCategory = categories[0];

const categoriesContainer = document.querySelector('.categories-wrapper');
const screenWrapper = document.querySelector('.wrapper');
const backBtn = document.querySelector('.back-btn');
const tasksContainer = document.querySelector('.tasks-wrapper');
const categoryImg = document.getElementById('category-img');
const categoryTitle = document.getElementById('category-title');
const numTasks = document.getElementById('num-tasks');
const categorySelect = document.getElementById('category-select');
const addTaskWrapper = document.querySelector('.add-task');
const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.getElementById('task-input');
const blackBackdrop = document.querySelector('.black-backdrop');
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');

// Fetch tasks from API
const fetchTasks = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    tasks = data;
    renderTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// Save task to API
const saveTask = async (task) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    tasks.push(data);
    renderTasks();
  } catch (error) {
    console.error('Error saving task:', error);
  }
};

// Update task in API
const updateTask = async (id, task) => {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const index = tasks.findIndex((t) => t.id === id);
    tasks[index] = { ...tasks[index], ...task };
    renderTasks();
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Delete task from API
const deleteTask = async (id) => {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const renderCategories = () => {
  categoriesContainer.innerHTML = '';
  categories.forEach((category) => {
    const div = document.createElement('div');
    div.classList.add('category');
    div.innerHTML = `
      <div>
        <img src="images/${category.img}" alt="${category.title}" />
        <p>${category.title}</p>
      </div>
    `;
    div.addEventListener('click', () => {
      selectedCategory = category;
      screenWrapper.classList.add('show-category');
      categoryTitle.textContent = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
    });
    categoriesContainer.appendChild(div);
  });
};

const renderTasks = () => {
  tasksContainer.innerHTML = '';
  const categoryTasks = tasks.filter(
    (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement('div');
      div.classList.add('task-wrapper');
      const label = document.createElement('label');
      label.classList.add('task');
      label.setAttribute('for', task.id);
      if (task.completed) {
        label.classList.add('completed');
      }
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        updateTask(task.id, tasks[index]);
      });
      div.innerHTML = `
      <div class="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1[_{{{CITATION{{{_1{](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md)[_{{{CITATION{{{_2{](https://github.com/priyalvaz/movieticketbooking/tree/9cc3561ba02a62a3ef4906e2d09158f0217c875d/book%2Ftime.php)[_{{{CITATION{{{_3{](https://github.com/mori-ari/20201017/tree/4a6a5b320c011c9b8e5cc9dc4e11b4dadb981466/20201017_2%2Findex.php)[_{{{CITATION{{{_4{](https://github.com/mrrony321/imdbserver/tree/4ac3b375b25a61380c8132ed87af3b9de234eeae/profile.php)[_{{{CITATION{{{_5{](https://github.com/VladislavsPerkanuks/MagebitHomework2020/tree/993e5bfc56d3408e4a8a392d1cdf4c9fffd26680/web%2Fsubscription.php)
      <div class="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916"
          />
        </svg>
      </div>
      `;
      label.innerHTML = `
      <span class="checkmark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </span>
      <p>${task.task}</p>
      <div class="task-options">
        <div class="options-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
          <div class="dropdown-content">
            <p class="delete-task">Delete Task</p>
          </div>
        </div>
      </div>
      `;
      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      const deleteBtn = div.querySelector('.delete-task');
      deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
      });
    });
  }
  numTasks.textContent = `${categoryTasks.length} tasks`;
};

const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle('active');
  blackBackdrop.classList.toggle('active');
  addTaskBtn.classList.toggle('active');
};

const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === '') {
    alert('Please enter a task');
  } else {
    const newTask = {
      task,
      category,
      completed: false,
    };
    saveTask(newTask);
    taskInput.value = '';
    toggleAddTaskForm();
  }
};

const renderCategoriesOptions = () => {
  categorySelect.innerHTML = '';
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });
};

// Inicializar variables y elementos del DOM
renderCategories();
renderCategoriesOptions();
fetchTasks();

// Eventos para el formulario de agregar tarea
addTaskBtn.addEventListener('click', toggleAddTaskForm);
blackBackdrop.addEventListener('click', toggleAddTaskForm);
addBtn.addEventListener('click', addTask);
cancelBtn.addEventListener('click', toggleAddTaskForm);

// Evento para volver a la pantalla de categorías
backBtn.addEventListener('click', () => {
  screenWrapper.classList.remove('show-category');
});
