import { TodosList } from "./TodosList.mjs";
let todos = new TodosList();
const TRANSITION_DURATION = 300;

function addTodo(title, priority) {
  const index = todos.addTodo(title, priority);
  render("add", index);
}

function removeTodo(id) {
  const index = todos.removeTodo(id);
  render("remove", index);
}

function toggleTodo(id) {
  const index = todos.toggleTodo(id);
  render("toggle", index);
}
function editTodo(id, title, priority) {
  const [index1, index2] = todos.editTodo(id, title, priority);
  render("move", index1, index2);
}

function submitHandler(event) {
  event.preventDefault();
  let [title, priority] = extractData(event.target);
  [title, priority] = clean(title, priority);
  if (!validate(title, priority)) {
    return alert("Bad Input !!");
  }
  addTodo(title, priority);
  eraseForm(event.target);
}

function extractData(target) {
  const data = new FormData(target);
  return [data.get("title"), data.get("priority")];
}

function clean(title, priority) {
  return [title.trim(), parseInt(priority.trim())];
}
function validate(title, priority) {
  return title.length > 0 && priority > 0 && priority < 10;
}
function eraseForm(form) {
  form[0].value = "";
  form[1].value = "0";
}
function createToDoUI(todo) {
  const row = document.createElement("tr");
  row.dataset.id = todo.id;
  const title = document.createElement("td");
  const priority = document.createElement("td");
  const btns = document.createElement("td");
  const removeBtn = document.createElement("button");
  const toggleBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const select = document.createElement("input");
  select.type = "checkbox";
  select.onchange = () => row.classList.toggle("selected");
  title.innerText = todo.title;
  priority.innerText = todo.priority;
  removeBtn.innerHTML = `<i class="fa-solid fa-trash fa-xl"></i>`;
  removeBtn.onclick = (e) => removeTodo(todo.id);
  toggleBtn.innerHTML = `<i class="fa-solid fa-square-check fa-xl"></i>`;
  toggleBtn.onclick = (e) => toggleTodo(todo.id);
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl"></i>`;
  editBtn.onclick = (e) => {
    row.classList.toggle("editable");
    title.contentEditable = true;
    priority.contentEditable = true;
  };
  saveBtn.classList.add("save");
  cancelBtn.classList.add("cancel");
  cancelBtn.onclick = (e) => {
    row.classList.toggle("editable");
    title.contentEditable = false;
    title.innerText = todo.title;
    priority.contentEditable = false;
    priority.innerText = todo.priority;
  };
  saveBtn.onclick = (e) => {
    const [newtitle, newpriority] = clean(title.innerText, priority.innerText);
    if (!validate(newtitle, newpriority)) {
      return alert("invalid Data");
    }
    editTodo(todo.id, newtitle, newpriority);
    row.classList.toggle("editable");
    title.contentEditable = false;
    priority.contentEditable = false;
  };
  saveBtn.innerHTML = `<i class="fa-solid fa-check fa-xl"></i>`;
  cancelBtn.innerHTML = `<i class="fa-solid fa-x fa-xl"></i>`;

  btns.appendChild(toggleBtn);
  btns.appendChild(removeBtn);
  btns.appendChild(editBtn);
  btns.appendChild(saveBtn);
  btns.appendChild(cancelBtn);
  btns.appendChild(select);
  row.appendChild(title);
  row.appendChild(priority);
  row.appendChild(btns);
  if (todo.completed) {
    row.classList.add("completed");
  }
  return row;
}

const tableBody = document.querySelector("tbody");
function render(hint, i, ii) {
  if (hint == "add") {
    return addTodoUI(i);
  }
  if (hint == "remove") {
    return reeditTodoUI(i);
  }
  if (hint == "toggle") {
    return toggleTodoUI(i);
  }
  if (hint == "move") {
    return editTodoUI(i, ii);
  }
  tableBody.innerHTML = "";
  todos.todos.forEach((todo) => tableBody.appendChild(createToDoUI(todo)));
}

function addTodoUI(index) {
  const newTodo = createToDoUI(todos.todos[index]);
  newTodo.classList.toggle("show");
  setTimeout(() => newTodo.classList.toggle("show"), TRANSITION_DURATION);
  if (index === 0) {
    tableBody.insertAdjacentElement("afterbegin", newTodo);
  } else {
    tableBody.children[index - 1].insertAdjacentElement("afterend", newTodo);
  }
}
function reeditTodoUI(index) {
  const removedTodo = tableBody.children[index];
  removedTodo.classList.add("remove");
  setTimeout(() => tableBody.removeChild(removedTodo), TRANSITION_DURATION);
}
function toggleTodoUI(index) {
  const toggledTodo = tableBody.children[index];
  toggledTodo.classList.toggle("completed");
  let tilt = "tilt-right";
  if (todos.todos[index].completed) {
    tilt = "tilt-left";
  }
  toggledTodo.classList.toggle(tilt);
  setTimeout(() => toggledTodo.classList.toggle(tilt), TRANSITION_DURATION);
}
function editTodoUIContent(indexInUI, indexInData) {
  tableBody.children[indexInUI].children[0].innerText =
    todos.todos[indexInData].title;
  tableBody.children[indexInUI].children[1].innerText =
    todos.todos[indexInData].priority;
}

function editTodoUI(i1, i2) {
  editTodoUIContent(i1, i2);
  if (i1 == i2) {
    return;
  }
  let direction = "up";
  let where = "beforebegin";
  if (i2 > i1) {
    direction = "down";
    where = "afterend";
  }
  const todoUi = tableBody.children[i1];
  const todoUiLoc = tableBody.children[i2];
  tableBody.removeChild(todoUi);
  todoUiLoc.insertAdjacentElement(where, todoUi);
  const diff = i1 - i2;
  todoUi.style.setProperty("--diff", diff);
  todoUi.classList.add("moving");

  let startEl = tableBody.children[i2 + 1];
  let endEl = tableBody.children[i1];

  if (direction == "down") {
    startEl = tableBody.children[i2 - 1];
  }
  startEl.classList.add("start");
  endEl.classList.add("end");
  setTimeout(() => {
    todoUi.classList.remove("moving");
    startEl.classList.remove("start");
    endEl.classList.remove("end");
    todoUi.style.removeProperty("--diff", diff);
  }, TRANSITION_DURATION);
}

const form = document.querySelector("form");
form.onsubmit = submitHandler;
const deleteSelected = document.querySelector(".delete-selected");
deleteSelected.onclick = () => {
  document.querySelectorAll(".selected").forEach((row) => {
    todos.todos = todos.todos.filter((todo) => {
      return row.dataset.id != todo.id;
    });
  });
  render();
};

render();
