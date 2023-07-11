import popupHandler from './modules/popup.js';
import addPromocodeMask from './modules/mask.js';
import addFormFieldLimits from './modules/formfield-limits.js';
import showAdditionalForm from './modules/show-form.js';
import login from './modules/fetch/login.js';
import pageLoad from './modules/fetch/page-load.js';
try {
    let loginButtons = document.body.querySelectorAll('.login');
    for (let button of loginButtons) {
        button.onclick = popupHandler;
    }
    addPromocodeMask();
    addFormFieldLimits();
    showAdditionalForm();
    let loginForm = document.querySelector('#popup-form');
    loginForm.addEventListener('submit', login);
    window.onload = pageLoad;
}
catch (e) {
    if (e instanceof Error) {
        alert(e.message);
    }
}
