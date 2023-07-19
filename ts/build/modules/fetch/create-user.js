var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as REQUESTS from './requests.js';
import getFormFields from '../get-formfields.js';
import handleFetchError from './error-handler.js';
export default function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        if (location.href !== `${REQUESTS.SITE_ORIGIN}create-user.html`)
            return;
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.REGISTRATION}`;
        const form = document.querySelector('#create-user');
        const [lastNameField, nameField, patronymicField, birthDateField, loginField, passwordField, repeatPasswordField, descriptionField, submitButton, cancelButton] = getFormFields(form);
        window.onbeforeunload = function () { return false; };
        cancelButton.onclick = function () {
            location.href = document.referrer;
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
                const userData = {
                    about: descriptionField.value,
                    first_name: nameField.value.toLowerCase(),
                    last_name: lastNameField.value.toLowerCase(),
                    patronymic: patronymicField.value.toLowerCase(),
                    birth_date: birthDateField.value,
                    login: loginField.value,
                    password: passwordField.value,
                    balance: 100 // это костыль для моки
                };
                const response = yield fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    document.cookie = `login=${userData.login}`;
                    location.href = `${REQUESTS.SITE_ORIGIN}user-profile.html`;
                }
                else {
                    handleFetchError(response.status, 'user');
                }
            });
        }
    });
}
