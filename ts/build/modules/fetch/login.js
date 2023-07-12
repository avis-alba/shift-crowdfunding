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
export default function login(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        let spinner = document.querySelector('.spinner-border');
        if (spinner)
            spinner.setAttribute('style', 'display: block');
        let form = document.querySelector('#popup-form');
        let loginField = form.elements[0];
        let passwordField = form.elements[1];
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.login}`;
        let requestData = {
            login: loginField.value,
            password: passwordField.value
        };
        let response = yield fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        if (spinner)
            spinner.setAttribute('style', 'display: none');
        if (response.ok) {
            let json = yield response.json();
            document.cookie = `user=${requestData.login}`;
            location.href = `${requests.siteOrigin}` + `user-profile.html`;
        }
        else if (`${response.status}`[0] === '4') {
            loginField.style.border = '2px solid #da467d';
            passwordField.style.border = '2px solid #da467d';
            response.json().then((response) => {
                console.log(response.message);
                alert('Неверный логин или пароль');
            }).catch((error) => {
                alert(error.message);
            });
        }
        else if (`${response.status}`[0] === '5') {
            alert('Ошибка сервера!');
        }
    });
}
