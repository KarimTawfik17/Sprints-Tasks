let todos = [];

const makeId = (function () {
  let id = 0;
  return () => id++;
})();

function addTodo(title, priority) {
  todos = [{ id: makeId(), title, priority, completed: false }, ...todos];
  sortTodos();
  render();
}

function removeTodo(id) {
  todos = todos.filter((todo) => id != todo.id);
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id != id ? todo : Object.assign(todo, { completed: !todo.completed })
  );
  render();
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

function render() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  todos.forEach((todo) => fragment.appendChild(createToDoUI(todo)));
  tableBody.appendChild(fragment);
}
const form = document.querySelector("form");
form.onsubmit = submitHandler;
render();
