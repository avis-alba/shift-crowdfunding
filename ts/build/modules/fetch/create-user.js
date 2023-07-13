var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as requests from './requests.js';
export default function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        if (window.location.href !== `${requests.siteOrigin}create-user.html`)
            return;
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.registration}`;
        let form = document.querySelector('#create-user');
        let lastNameField = form.elements[0];
        let nameField = form.elements[1];
        let patronymicField = form.elements[2];
        let birthDateField = form.elements[3];
        let loginField = form.elements[4];
        let passwordField = form.elements[5];
        let repeatPasswordField = form.elements[6];
        let descriptionField = form.elements[7];
        let cancelButton = form.elements[9];
        window.onbeforeunload = function () { return false; };
        cancelButton.onclick = function () {
            window.location.href = document.referrer;
        };
        form.addEventListener('submit', registration);
        function registration(event) {
            return __awaiter(this, void 0, void 0, function* () {
                window.onbeforeunload = null;
                event.preventDefault();
                if (passwordField.value !== repeatPasswordField.value) {
                    repeatPasswordField.style.border = '2px solid #da467d';
                    return;
                }
                let userData = {
                    about: descriptionField.value,
                    first_name: nameField.value.toLowerCase(),
                    last_name: lastNameField.value.toLowerCase(),
                    patronymic: patronymicField.value.toLowerCase(),
                    birth_date: birthDateField.value,
                    login: loginField.value,
                    password: passwordField.value,
                    balance: 100 // это костыль для моки
                };
                let response = yield fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    document.cookie = `user=${userData.login}`;
                    document.cookie = "SameSite=None";
                    window.location.href = `${requests.siteOrigin}user-profile.html`;
                }
                else if (`${response.status}`[0] === '4') {
                    response.status == 409 ? alert('Данный логин занят') : null;
                    alert('Ошибка отправки формы!');
                }
                else if (`${response.status}`[0] === '5') {
                    alert('Ошибка сервера!');
                }
            });
        }
    });
}
