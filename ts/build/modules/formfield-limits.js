import { formFieldsRegExp } from './regexp.js';
export default function addFormFieldLimits() {
    let lastname = document.querySelector('#lastname');
    let name = document.querySelector('#name');
    let patronymic = document.querySelector('#patronymic');
    let login = document.querySelector('#login');
    let password = document.querySelector('#password');
    let projectName = document.querySelector('#project-name');
    let popupLogin = document.querySelector('#popup-login');
    let popupPassword = document.querySelector('#popup-password');
    let youtubeURL = document.querySelector('#url');
    lastname ? lastname.pattern = formFieldsRegExp.userName.toString().slice(1, -1) : null;
    name ? name.pattern = formFieldsRegExp.userName.toString().slice(1, -1) : null;
    patronymic ? patronymic.pattern = formFieldsRegExp.userName.toString().slice(1, -1) : null;
    login ? login.pattern = formFieldsRegExp.login.toString().slice(1, -1) : null;
    password ? password.pattern = formFieldsRegExp.password.toString().slice(1, -1) : null;
    projectName ? projectName.pattern = formFieldsRegExp.projectName.toString().slice(1, -1) : null;
    popupLogin ? popupLogin.pattern = formFieldsRegExp.login.toString().slice(1, -1) : null;
    popupPassword ? popupPassword.pattern = formFieldsRegExp.password.toString().slice(1, -1) : null;
    youtubeURL ? youtubeURL.pattern = formFieldsRegExp.youtubeURL.toString().slice(1, -1) : null;
}
