export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));

        if (!this.todos || this.todos.length < 1){
            this.todos = [
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch JS Tutorials',
                    completed: false
                }
            ]
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    getTodos() {
        return [...this.todos];
    }

    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.getTodos()));
    }

    addTodo(title, description) {
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false
        };

        this.todos.push(todo);
        this.save();

        return {...todo};
    }

    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }

    editTodo(id, values) {
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values); // update the object with new properties
        this.save();
    }
}