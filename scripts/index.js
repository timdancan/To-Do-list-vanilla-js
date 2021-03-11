const template = document.querySelector(".template");
const task = document.querySelector(".task");
const addButton = document.querySelectorAll(".tasks__button");
const scopeTaskNumber = document.querySelector(".counter__number_scope");
const activeTaskNumber = document.querySelector(".counter__number_active");
const successfulTaskNumber = document.querySelector(
  ".counter__number_successful"
);
const date = formattedDate();

function composeItem() {
  const newItem = template.content.cloneNode(true);
  const taskData = newItem.querySelector(".task__data");
  const checkboxStyle = newItem.querySelector(".checkbox__style");
  const deleteButton = newItem.querySelector(".task__button_trash");
  const editButton = newItem.querySelector(".task__button_edit");
  const taskText = newItem.querySelector(".task__text");
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
    targetItem.remove();
  });
  editButton.addEventListener("click", () => {
    editButton.classList.toggle("task__button_edit-active");
    taskText.disabled = !taskText.disabled;
    taskText.classList.toggle("task__text_disabled");
  });
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
  return newItem;
}

// function deleteItem(e) {
//   const targetElement = e.target;
//   const targetItem = targetElement.closest(".task__label");
//   scopeTaskNumber.textContent = reduceCount(prevCountScope);
//   if (checkboxStyle.classList.contains("task__checkbox_active")) {
//     activeTaskNumber.textContent = reduceCount(prevCountActive);
//   } else {
//     successfulTaskNumber.textContent = reduceCount(prevCountSuccess);
//   }
//   targetItem.remove();
// }

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
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
}

addButton.forEach((button) => {
  button.addEventListener("click", addNewItem);
});
