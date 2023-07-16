export default class Filters {
    constructor() {
        this.filters = document.getElementById('filters');
        this.searchBtn = document.getElementById('search');
    }

    onClick(callback) {
        this.searchBtn.onclick = (e) => {
            e.preventDefault();
            const { type, words } = this.filters;
            // const form = new DataForm();
            // const filters = {
            //     type: form.get('type'),
            //     words: form.get('words')
            // }
            const filters = {
                type: type.value,
                words: words.value
            }
            callback(filters);
        }
    }
}