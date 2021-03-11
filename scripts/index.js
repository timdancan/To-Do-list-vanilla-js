const template = document.querySelector(".template");
const task = document.querySelector(".task");
const addButton = document.querySelectorAll(".tasks__button");
const scopeTaskNumber = document.querySelector(".counter__number_scope");
const activeTaskNumber = document.querySelector(".counter__number_active");
const successfulTaskNumber = document.querySelector(
  ".counter__number_successful"
);
const date = formattedDate();
const todoList = []

function composeItem() {
  const newItem = template.content.cloneNode(true);
  const taskData = newItem.querySelector(".task__data");
  const checkboxStyle = newItem.querySelector(".checkbox__style");
  const deleteButton = newItem.querySelector(".task__button_trash");
  const editButton = newItem.querySelector(".task__button_edit");
  const taskText = newItem.querySelector(".task__text");
  // Удаление элемента
  deleteButton.addEventListener("click", (e) => {
    const targetElement = e.target;
    const targetItem = targetElement.closest(".task__label");
    const prevCountScope = scopeTaskNumber.textContent;
    const prevCountActive = activeTaskNumber.textContent;
    const prevCountSuccess = successfulTaskNumber.textContent;
    if (checkboxStyle.classList.contains("task__checkbox_active")) {
      successfulTaskNumber.textContent = reduceCount(prevCountSuccess);
    } else {
      activeTaskNumber.textContent = reduceCount(prevCountActive);
    }
    scopeTaskNumber.textContent = reduceCount(prevCountScope);
    removeLocalTodos(targetItem)
    targetItem.remove();
  });
  //  Изменение импута
  editButton.addEventListener("click", () => {
    editButton.classList.toggle("task__button_edit-active");
    taskText.disabled = !taskText.disabled;
    taskText.classList.toggle("task__text_disabled");
  });
  // Тогл активный - не активный
  checkboxStyle.addEventListener("click", () => {
    taskText.classList.toggle("task__text_active");
    checkboxStyle.classList.toggle("task__checkbox_active");
    const prevCountActive = activeTaskNumber.textContent;
    const prevCountSuccess = successfulTaskNumber.textContent;
    if (checkboxStyle.classList.contains("task__checkbox_active")) {
      activeTaskNumber.textContent = reduceCount(prevCountActive);
      successfulTaskNumber.textContent = increaseCount(prevCountSuccess);
    } else {
      activeTaskNumber.textContent = increaseCount(prevCountActive);
      successfulTaskNumber.textContent = reduceCount(prevCountSuccess);
    }
  });

  taskData.textContent = date;
  // добавлние в локалсторедж
  saveLocalTodos(taskText.value);

  return newItem;
}

function addNewItem() {
  const newItem = composeItem();
  task.prepend(newItem);

  const prevCountScope = scopeTaskNumber.textContent;
  const prevCountActive = activeTaskNumber.textContent;
  scopeTaskNumber.textContent = increaseCount(prevCountScope);
  activeTaskNumber.textContent = increaseCount(prevCountActive);
}

function increaseCount(prev) {
  prev = +prev + 1;
  return prev;
}

function reduceCount(prev) {
  prev = +prev - 1;
  return prev;
}

function formattedDate(d = new Date()) {
  let month = String(d.toLocaleString("default", { month: "long" }));
  let day = String(d.getDate());
  let year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const newItem = template.content.cloneNode(true);
    const taskData = newItem.querySelector(".task__data");
    const checkboxStyle = newItem.querySelector(".checkbox__style");
    const deleteButton = newItem.querySelector(".task__button_trash");
    const editButton = newItem.querySelector(".task__button_edit");
    const taskText = newItem.querySelector(".task__text");
    // Удаление элемента
    deleteButton.addEventListener("click", (e) => {
      const targetElement = e.target;
      const targetItem = targetElement.closest(".task__label");
      const prevCountScope = scopeTaskNumber.textContent;
      const prevCountActive = activeTaskNumber.textContent;
      const prevCountSuccess = successfulTaskNumber.textContent;
      if (checkboxStyle.classList.contains("task__checkbox_active")) {
        successfulTaskNumber.textContent = reduceCount(prevCountSuccess);
      } else {
        activeTaskNumber.textContent = reduceCount(prevCountActive);
      }
      scopeTaskNumber.textContent = reduceCount(prevCountScope);
      removeLocalTodos()
      targetItem.remove();
    });
    //  Изменение импута
    editButton.addEventListener("click", () => {
      editButton.classList.toggle("task__button_edit-active");
      taskText.disabled = !taskText.disabled;
      taskText.classList.toggle("task__text_disabled");
    });
    // Тогл активный - не активный
    checkboxStyle.addEventListener("click", () => {
      taskText.classList.toggle("task__text_active");
      checkboxStyle.classList.toggle("task__checkbox_active");
      const prevCountActive = activeTaskNumber.textContent;
      const prevCountSuccess = successfulTaskNumber.textContent;
      if (checkboxStyle.classList.contains("task__checkbox_active")) {
        activeTaskNumber.textContent = reduceCount(prevCountActive);
        successfulTaskNumber.textContent = increaseCount(prevCountSuccess);
      } else {
        activeTaskNumber.textContent = increaseCount(prevCountActive);
        successfulTaskNumber.textContent = reduceCount(prevCountSuccess);
      }
    });

    taskData.textContent = date;

    task.prepend(newItem);

    const prevCountScope = scopeTaskNumber.textContent;
    const prevCountActive = activeTaskNumber.textContent;
    scopeTaskNumber.textContent = increaseCount(prevCountScope);
    activeTaskNumber.textContent = increaseCount(prevCountActive);
  });
}

function removeLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  localStorage.removeItem("todos")
}

document.addEventListener("DOMContentLoaded", getTodos);

addButton.forEach((button) => {
  button.addEventListener("click", addNewItem);
});
