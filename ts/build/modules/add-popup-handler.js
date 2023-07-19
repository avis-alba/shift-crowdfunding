import popupHandler from './popup.js';
import login from './fetch/login.js';
export default function addPopupHandler() {
    const loginButtons = document.body.querySelectorAll('#login-button');
    for (let button of loginButtons) {
        button.onclick = popupHandler;
    }
    const loginForm = document.querySelector('#popup-form');
    loginForm.addEventListener('submit', login);
}
