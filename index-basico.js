const title = document.getElementById('title');
const description = document.getElementById('description');
const alert = document.getElementById('alert');
const add = document.getElementById('add');
const table = document.getElementById('table');
let id = 1;


function removeTodo(id) {
    document.getElementById(id).remove();
}

function addTodo() {
    if (title.value === '' || description.value === '') {
        alert.classList.remove('d-none');
        alert.innerText = 'Text and description are required';
        return;
    }

    alert.classList.add('d-none');
    const row = table.insertRow();
    row.setAttribute('id', id++);
    row.innerHTML = `
    <td>${title.value}</td>
    <td>${description.value}</td>
    <td class="text-center">
        <input type="checkbox">
    </td>
    <td class="text-right">
        <button class="btn btn-primary mb-1">
        <i class="fa fa-pencil"></i>
    </td>
    `;

    const remove = document.createElement('button');
    remove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-2');
    remove.innerHTML = '<i class="fa fa-trash"></i>';
    row.children[3].appendChild(remove);

    remove.onclick = () => removeTodo(row.getAttribute('id'));
}

add.onclick = addTodo;
