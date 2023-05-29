let todos = [];

const makeId = (function () {
  let id = 0;
  return () => id++;
})();

function addTodo(title, priority) {
  todos = [{ id: makeId(), title, priority, completed: false }, ...todos];
}

function removeTodo(id) {
  todos = todos.filter((todo) => id != todo.id);
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id != id ? todo : Object.assign(todo, { completed: !todo.completed })
  );
}
