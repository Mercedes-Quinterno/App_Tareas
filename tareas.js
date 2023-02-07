const initialTasks = [
	{
		titulo: "Estudiar Html",
		estado: "Terminada",
	}, {
		titulo: "Estudiar Css",
		estado: "En progreso",
	}, {
		titulo: "Estudiar Js",
		estado: "Pendiente",
	}, {
		titulo: "Practicar Js",
		estado: "En progreso"
	},
];

const taskStateClasses = {
	"Pendiente": "pending",
	"En progreso": "in-progress",
	"Terminada": "finished",
};

let tasks = initialTasks;
let displayedTasks = tasks;

let editedTask = null;

const removeTask = (taskToRemove) => {
	tasks = tasks.filter((task) => task !== taskToRemove);
	displayedTasks = tasks;
	updateTasks();
}

const editTask = (taskToEdit) => {
	const taskTitleInput = document.querySelector(".task-form-title-input");
	const taskStateSelect = document.querySelector(".task-form-state-select");
	
	taskTitleInput.value = taskToEdit.titulo;
	taskStateSelect.value = taskToEdit.estado;
	
	editedTask = taskToEdit;
	
	openTaskModal(true);
}

const createTaskCard = (task) => {
	const textNode = document.createTextNode(task.titulo);
	const taskBodyNode = document.createElement("div");
	taskBodyNode.appendChild(textNode);
	
	const eraseText = document.createTextNode("Borrar");
	const eraseTaskButton = document.createElement("button");
	eraseTaskButton.appendChild(eraseText);
	eraseTaskButton.addEventListener("click", (event) => {
		removeTask(task)
	});
	

	const editText = document.createTextNode("Editar");
	const editTaskButton = document.createElement("button");
	editTaskButton.appendChild(editText);
	editTaskButton.addEventListener("click", (event) => {
		editTask(task)
	});
	
	const taskOptionsNode = document.createElement("div");
	taskOptionsNode.appendChild(eraseTaskButton);
	taskOptionsNode.appendChild(editTaskButton);
	taskBodyNode.appendChild(taskOptionsNode);
	
	const taskNode = document.createElement("li");
	taskNode.appendChild(taskBodyNode);
	taskNode.classList.add("task-list-item");
	taskNode.classList.add(taskStateClasses[task.estado]);
	return taskNode;
}

const tasksToElements = (tasks) => {
	return tasks.map((task) => createTaskCard(task));
}

const updateTasks = () => {
	const tasksList = document.querySelector(".tasks-list");
	tasksList.replaceChildren(...tasksToElements(displayedTasks));
}

const toggleTheme = () => {
	const root = document.querySelector("html");
	const lightAttribute = root.getAttribute("light");
	if (lightAttribute === "") {
		root.removeAttribute("light");
		root.setAttribute("dark", "");
	} else {
		root.removeAttribute("dark");
		root.setAttribute("light", "");
	}
}

function saveEditTask(event) {
	const taskTitleInput = document.querySelector(".task-form-title-input");
	const taskStateSelect = document.querySelector(".task-form-state-select");
	const title = taskTitleInput.value;
	const state = taskStateSelect.options[taskStateSelect.selectedIndex].value;
	tasks = tasks.filter((task) => task !== editedTask);
	tasks.push({titulo: title, estado: state});
	displayedTasks = tasks;
	updateTasks();
	closeTaskModal();
}

function saveTask(event) {
	const taskTitleInput = document.querySelector(".task-form-title-input");
	const taskStateSelect = document.querySelector(".task-form-state-select");
	const title = taskTitleInput.value;
	const state = taskStateSelect.options[taskStateSelect.selectedIndex].value;
	tasks.push({titulo: title, estado: state});
	displayedTasks = tasks;
	updateTasks();
	closeTaskModal();
}

const openTaskModal = (edit=false) => {
	const taskSaveButton = document.querySelector(".task-save");
	if (edit) {
		taskSaveButton.addEventListener("click", saveEditTask);
	} else {
		taskSaveButton.addEventListener("click", saveTask);
	}
	
	const taskModal = document.querySelector(".task-modal");
	taskModal.classList.add("active");
}

const closeTaskModal = () => {
	const taskSaveButton = document.querySelector(".task-save");
	taskSaveButton.removeEventListener("click", saveEditTask, false);
	taskSaveButton.removeEventListener("click", saveTask, false);
	const taskModal = document.querySelector(".task-modal");
	taskModal.classList.remove("active");
}

window.onload = (event) => {
	const root = document.querySelector("html");
	root.setAttribute("dark", "");
	
	root.addEventListener("click", (event) => {
		const tasksMenuDropdown = document.querySelector(".tasks-menu-dropdown");
		tasksMenuDropdown.classList.remove("active");
	});

	updateTasks();
	
	const tasksMenuButton = document.querySelector(".tasks-menu-button");
	tasksMenuButton.addEventListener("click", (event) => {
		event.stopPropagation();
		const tasksMenuDropdown = document.querySelector(".tasks-menu-dropdown");
		const isOpen = tasksMenuDropdown.classList.contains("active");
		if (isOpen) {
			tasksMenuDropdown.classList.remove("active");
		} else {
			tasksMenuDropdown.classList.add("active");
		}
	});

	const tasksFilterButtons = document.querySelectorAll(".tasks-filter");
	tasksFilterButtons.forEach((filterButton) => {
		filterButton.addEventListener("click", (event) => {
			
			const state = event.target.dataset.state;
			state ? displayedTasks = tasks.filter(({estado}) => estado === state) : displayedTasks = tasks;
			updateTasks();
		});
	});
	
	const toggleThemeButton = document.querySelector(".toggle-theme");
	toggleThemeButton.addEventListener("click", (event) => {
		toggleTheme();
	});
	

	const taskAddButton = document.querySelector(".tasks-add");
	taskAddButton.addEventListener("click", (event) => {
		openTaskModal();
	});
	const closeModalIcon = document.querySelector(".modal-close");
	closeModalIcon.addEventListener("click", (event) => {
		closeTaskModal();
	});
}
const taskInput = document.getElementsByClassName (".task-form-title-input");
const taskForm = document.getElementsByClassName (".task-form");
const errorInput = document.getElementsByClassName (".error");

form.addEventListener ('submit', (e) => {
	let messages = []
	if (taskInput.value === '' || taskInput.value == null ) {
		messages.push ("No es posible guardar una tarea vacía");
		}
	
	if (messages.length <= 5) {
		messages.push ("La tarea debe tener más de 5 caracteres")
		e.preventDefault()
		errorInput.innerText = messages.join(', ')
	}
	
})