const template = document.querySelector('.template')
const task = document.querySelector('.task')
const addButton = document.querySelectorAll('.tasks__button')
const date = formattedDate()

function composeItem() {
  const newItem = template.content.cloneNode(true)
  const taskData = newItem.querySelector('.task__data')
  const checkboxStyle = newItem.querySelector('.checkbox__style')
  const deleteButton = newItem.querySelector('.task__button_trash')
  const editButton = newItem.querySelector('.task__button_edit')
  const taskText = newItem.querySelector('.task__text') 
  deleteButton.addEventListener('click', deleteItem)
  editButton.addEventListener('click', () => {
    editButton.classList.toggle('task__button_edit-active')
    taskText.disabled = !taskText.disabled
    taskText.classList.toggle('task__text_disabled')
  })
  checkboxStyle.addEventListener('click', () =>{
    taskText.classList.toggle('task__text_active')
    checkboxStyle.classList.toggle('task__checkbox_active')
  })
  taskData.textContent = date
  return newItem
}

function deleteItem(e) {
  const targetElement = e.target
  const targetItem = targetElement.closest('.task__label')
  targetItem.remove()
}

function addNewItem() {
  const newItem = composeItem()
  task.prepend(newItem)
}

function formattedDate(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

addButton.forEach(button => {
  button.addEventListener('click', addNewItem)
})