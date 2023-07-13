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
export default function getUserProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        if (window.location.href !== `${requests.siteOrigin}user-profile.html`)
            return;
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.userInfo}`;
        let response = yield fetch(requestURL);
        let form = document.querySelector('#edit-user');
        let lastNameField = form.elements[0];
        let nameField = form.elements[1];
        let patronymicField = form.elements[2];
        let birthDateField = form.elements[3];
        let descriptionField = form.elements[4];
        let balance = document.querySelector('#money');
        form.addEventListener('submit', updateUserProfile);
        if (response.ok) {
            let user = yield response.json();
            lastNameField.value = user.last_name[0].toUpperCase() + user.last_name.slice(1);
            nameField.value = user.first_name[0].toUpperCase() + user.first_name.slice(1);
            patronymicField.value = user.patronymic[0].toUpperCase() + user.patronymic.slice(1);
            birthDateField.value = user.birth_date;
            descriptionField.value = user.about;
            balance.innerHTML = user.balance;
        }
        else if (`${response.status}`[0] === '4') {
            response.json().then((response) => {
                console.log(response.message);
                alert('Ошибка загрузки');
            }).catch((error) => {
                alert(error.message);
            });
        }
        else if (`${response.status}`[0] === '5') {
            alert('Ошибка сервера!');
        }
        let inputs = [lastNameField, nameField, patronymicField, birthDateField, descriptionField];
        for (let field of inputs) {
            field.onchange = function () {
                window.onbeforeunload = function () { return false; };
            };
        }
        function updateUserProfile(event) {
            return __awaiter(this, void 0, void 0, function* () {
                window.onbeforeunload = null;
                event.preventDefault();
                let updatedData = {
                    about: descriptionField.value,
                    first_name: nameField.value.toLowerCase(),
                    last_name: lastNameField.value.toLowerCase(),
                    patronymic: patronymicField.value.toLowerCase(),
                    birth_date: birthDateField.value,
                    balance: balance.innerHTML // это костыль для моки
                };
                let response = yield fetch(requestURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(updatedData)
                });
                if (response.ok) {
                    location.reload();
                }
                else if (`${response.status}`[0] === '4') {
                    alert('Ошибка отправки формы');
                }
                else if (`${response.status}`[0] === '5') {
                    alert('Ошибка сервера!');
                }
            });
        }
        let sendMoneyForm = document.querySelector('#send-money');
        let promocodeField = sendMoneyForm.elements[0];
        sendMoneyForm.addEventListener('submit', sendPromocode);
        function sendPromocode(event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.balance}`;
                let promocode = {
                    promo_code: promocodeField.value
                };
                let response = yield fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(promocode)
                });
                if (response.ok) {
                    let currentBalance = yield response.json();
                    balance.innerHTML = currentBalance.current_balance || 10000;
                    // ответа нет в моках
                    /*{
                            "current_balance": 0
                    } */
                }
                else if (`${response.status}`[0] === '4') {
                    alert('Неверный промокод');
                }
                else if (`${response.status}`[0] === '5') {
                    alert('Ошибка сервера!');
                }
            });
        }
    });
}
