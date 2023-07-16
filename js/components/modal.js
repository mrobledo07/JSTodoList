import Alert from './alert.js';

export default class Modal {
    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.completed = document.getElementById('modal-completed');
        this.btn = document.getElementById('modal-btn');
        this.alert = new Alert('modal-alert');
    }

    onClick(todo, callback) {
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
        $('#modal').modal('toggle');
        this.btn.onclick = () => {
            if (this.title.value === '' || this.description.value === '') {
                this.alert.show('Title and description are required');
            }
            else {
                this.alert.hide();
                $('#modal').modal('hide');
                callback(todo.id, {
                    title: this.title.value,
                    description: this.description.value,
                    completed: this.completed.checked
                });
            }
        }
    }
}