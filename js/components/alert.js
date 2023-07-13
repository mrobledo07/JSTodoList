export default class Alert {
    constructor(alertId) {
        this.alert = document.getElementById(alertId);
    }

    hide() {
        this.alert.classList.add('d-none');
    }

    show(message) {
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }
}