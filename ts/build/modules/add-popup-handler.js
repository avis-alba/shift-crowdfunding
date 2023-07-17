import popupHandler from './popup.js';
import login from './fetch/login.js';
export default function addPopupHandler() {
    let loginButtons = document.body.querySelectorAll('.login');
    for (let button of loginButtons) {
        button.onclick = popupHandler;
    }
    let loginForm = document.querySelector('#popup-form');
    loginForm.addEventListener('submit', login);
}
