import dummy_todos from "./dummy_todos.mjs";
import { Todo } from "./Todo.mjs";

export class TodosList {
  todos = [];
  constructor(data) {
    data = data || dummy_todos;
    this.todos = data.map((el) => new Todo(el));
    this.sortTodos();
  }

  sortTodos() {
    this.todos = this.todos.sort((a, b) => a.priority - b.priority); // if you used '>' instead of '-' won't work on chrome
  }

  addTodo(title, priority) {
    const newTodo = new Todo({ title, priority });
    this.todos = [newTodo, ...this.todos];
    this.sortTodos();
    const index = this.todos.indexOf(newTodo);
    // render("add", index);
  }
  removeTodo(id) {
    let index;
    this.todos = this.todos.filter((todo, i) => {
      if (id == todo.id) {
        index = i;
      }
      return id != todo.id;
    });
    // render("remove", index);
  }
  toggleTodo(id) {
    let index;
    this.todos = this.todos.map((todo, i) => {
      if (todo.id == id) {
        index = i;
      }
      return todo.id != id
        ? todo
        : Object.assign(todo, { completed: !todo.completed });
    });
    // render("toggle", index);
  }
  editTodo(id, title, priority) {
    let index1;
    let index2;
    const editedTodo = new Todo({ id, title, priority });
    this.todos = this.todos.map((todo, i) => {
      if (todo.id == id) {
        index1 = i;
        return editedTodo;
      }
      return todo;
    });
    this.sortTodos();
    index2 = this.todos.indexOf(editedTodo);
    // render("move", index1, index2);
  }
}

const todos = new TodosList();
console.log(todos);
todos.addTodo("Karim", -100);
console.log(todos);
todos.toggleTodo(5);
console.log(todos);
todos.toggleTodo(5);
console.log(todos);
todos.editTodo(5, "karim tawfik", 70);
console.log(todos);
