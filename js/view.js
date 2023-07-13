import AddTodo from './components/addtodo.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();

        this.addTodoForm.onClick((title, description) => this.addTodo(title, description))
    }   

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }
    
    addTodo(title, description) {
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">

        </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
            <i class="fa fa-pencil"></i>
        </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        row.children[2].appendChild(checkbox);

        checkbox.onclick = () => this.toggleCompleted(todo.id);

        const remove = document.createElement('button');
        remove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-2');
        remove.innerHTML = '<i class="fa fa-trash"></i>';
        row.children[3].appendChild(remove);

        remove.onclick = () => this.removeTodo(todo.id);
    }
}