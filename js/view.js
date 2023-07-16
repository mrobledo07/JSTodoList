import AddTodo from './components/addtodo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filters();

        this.addTodoForm.onClick((title, description) => this.addTodo(title, description))
        this.filters.onClick((filters) => this.filter(filters));
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

    editTodo(id, values) {
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        const { title, description, completed }  = values;
        row.children[0].innerText = title;
        row.children[1].innerText = description;
        row.children[2].children[0].checked = completed;
    }

    filter(filters) {
        const { type, words } = filters;
        const [,...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description, completed] = row.children;
            let shouldHide = false;
            if (words) shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;
            
            if (type !== 'all' && shouldBeCompleted !== isCompleted) shouldHide = true;

            if (shouldHide) row.classList.add('d-none');
            else row.classList.remove('d-none');
        }
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `<tr>
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">

        </td>
        <td class="text-right">
            
        </td> </tr>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        row.children[2].appendChild(checkbox);

        checkbox.onclick = () => this.toggleCompleted(todo.id);

        const edit = document.createElement('button');
        edit.classList.add('btn', 'btn-primary', 'mb-1');
        edit.innerHTML = '<i class="fa fa-pencil"></i>';
        row.children[3].appendChild(edit);

        edit.onclick = () => this.modal.onClick({... todo}, (id, values) => this.editTodo(id, values));

        const remove = document.createElement('button');
        remove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-2');
        remove.innerHTML = '<i class="fa fa-trash"></i>';
        row.children[3].appendChild(remove);

        remove.onclick = () => this.removeTodo(todo.id);
    }
}