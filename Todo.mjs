let id = 0;
export class Todo {
  constructor({ id, title, priority, completed = false }) {
    this.id = id || this.makeId();
    this.title = title;
    this.priority = priority;
    this.completed = completed;
  }
  makeId() {
    return id++;
  }
}
// console.log(new Todo("karim"));
// console.log(new Todo("aya"));
// console.log(new Todo("nada"));
