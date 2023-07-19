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
export default function login(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const spinner = document.querySelector('#spinner-login');
        if (spinner)
            spinner.setAttribute('style', 'display: block');
        const form = document.querySelector('#popup-form');
        const [loginField, passwordField] = getFormFields(form);
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.LOGIN}`;
        const requestData = {
            login: loginField.value,
            password: passwordField.value
        };
        const response = yield fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        if (spinner)
            spinner.setAttribute('style', 'display: none');
        if (response.ok) {
            document.cookie = `login=${requestData.login}`;
            location.href = `${REQUESTS.SITE_ORIGIN}` + `user-profile.html`;
        }
        else if (response.status === 400 /* ERROR_CODES.BAD_REQUEST */) {
            loginField.style.border = '2px solid #da467d';
            passwordField.style.border = '2px solid #da467d';
            alert('Неверный логин или пароль!');
            return;
        }
        else {
            handleFetchError(response.status, 'user');
        }
    });
}
