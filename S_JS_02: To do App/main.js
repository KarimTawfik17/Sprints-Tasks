let todos = [];

const makeId = (function () {
  let id = 0;
  return () => id++;
})();

function addTodo(title, priority) {
  const newTodo = { id: makeId(), title, priority, completed: false };
  todos = [newTodo, ...todos];
  sortTodos();
  const index = todos.indexOf(newTodo);
  render("add", index);
}

function removeTodo(id) {
  let index;
  todos = todos.filter((todo, i) => {
    if (id == todo.id) {
      index = i;
    }
    return id != todo.id;
  });
  render("remove", index);
}

function toggleTodo(id) {
  let index;
  todos = todos.map((todo, i) => {
    if (todo.id == id) {
      index = i;
    }
    return todo.id != id
      ? todo
      : Object.assign(todo, { completed: !todo.completed });
  });
  render("toggle", index);
}
function sortTodos() {
  todos = todos.sort((a, b) => a.priority <= b.priority);
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
  const title = document.createElement("td");
  const priority = document.createElement("td");
  const btns = document.createElement("td");
  const removeBtn = document.createElement("button");
  const toggleBtn = document.createElement("button");
  title.innerText = todo.title;
  priority.innerText = todo.priority;
  removeBtn.innerHTML = `<i class="fa-solid fa-trash fa-xl"></i>`;
  removeBtn.onclick = (e) => removeTodo(todo.id);
  toggleBtn.innerHTML = `<i class="fa-solid fa-square-check fa-xl"></i>`;
  toggleBtn.onclick = (e) => toggleTodo(todo.id);
  btns.appendChild(toggleBtn);
  btns.appendChild(removeBtn);
  row.appendChild(title);
  row.appendChild(priority);
  row.appendChild(btns);
  if (todo.completed) {
    row.classList.add("completed");
  }
  return row;
}

const tableBody = document.querySelector("tbody");
function render(hint, i) {
  if (hint == "add") {
    return addTodoUI(i);
  }
  if (hint == "remove") {
    return removeTodoUI(i);
  }
  if (hint == "toggle") {
    return toggleTodoUI(i);
  }
}

function addTodoUI(index) {
  const newTodo = createToDoUI(todos[index]);
  newTodo.classList.toggle("show");
  setTimeout(() => newTodo.classList.toggle("show"), 400);
  if (index === 0) {
    tableBody.insertAdjacentElement("afterbegin", newTodo);
  } else {
    tableBody.children[index - 1].insertAdjacentElement("afterend", newTodo);
  }
}
function removeTodoUI(index) {
  const removedTodo = tableBody.children[index];
  removedTodo.classList.add("remove");
  setTimeout(() => tableBody.removeChild(removedTodo), 400);
}
function toggleTodoUI(index) {
  const toggledTodo = tableBody.children[index];
  toggledTodo.classList.toggle("completed");
  let tilt = "tilt-right";
  if (todos[index].completed) {
    tilt = "tilt-left";
  }
  toggledTodo.classList.toggle(tilt);
  setTimeout(() => toggledTodo.classList.toggle(tilt), 400);
}

const form = document.querySelector("form");
form.onsubmit = submitHandler;
render();
