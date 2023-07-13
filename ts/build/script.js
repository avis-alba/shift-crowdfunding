import popupHandler from './modules/popup.js';
import addPromocodeMask from './modules/mask.js';
import addFormFieldLimits from './modules/formfield-limits.js';
import showAdditionalForm from './modules/show-form.js';
import login from './modules/fetch/login.js';
import pageLoad from './modules/fetch/page-load.js';
import getProjects from './modules/fetch/projects.js';
import getUserProfile from './modules/fetch/user-load.js';
import getProjectInfo from './modules/fetch/project-load.js';
import createUser from './modules/fetch/create-user.js';
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
    window.addEventListener('load', pageLoad);
    window.addEventListener('load', getProjects);
    window.addEventListener('load', getUserProfile);
    window.addEventListener('load', getProjectInfo);
    window.addEventListener('load', createUser);
}
catch (e) {
    if (e instanceof Error) {
        alert(e.message);
    }
}
