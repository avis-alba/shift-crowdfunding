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
import showAdditionalForm from '../show-form.js';
import addPromocodeMask from '../mask.js';
import getFormFields from '../get-formfields.js';
import handleFetchError from './error-handler.js';
export default function getUserProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        if (location.href !== `${REQUESTS.SITE_ORIGIN}user-profile.html`)
            return;
        showAdditionalForm();
        addPromocodeMask();
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.USER_INFO}`;
        const requestURLUpdate = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.PUT.EDIT_USER}`;
        const form = document.querySelector('#edit-user');
        const formFields = getFormFields(form);
        const [lastNameField, nameField, patronymicField, birthDateField, descriptionField] = formFields;
        const balance = document.querySelector('#money');
        form.addEventListener('submit', updateUserProfile);
        const response = yield fetch(requestURL);
        if (response.ok) {
            const user = yield response.json();
            lastNameField.value = user.last_name[0].toUpperCase() + user.last_name.slice(1);
            nameField.value = user.first_name[0].toUpperCase() + user.first_name.slice(1);
            patronymicField.value = user.patronymic[0].toUpperCase() + user.patronymic.slice(1);
            birthDateField.value = user.birth_date;
            descriptionField.value = user.about;
            balance.innerHTML = user.balance;
        }
        else {
            handleFetchError(response.status, 'user');
        }
        for (let field of formFields) {
            field.onchange = function () {
                window.onbeforeunload = function () { return false; };
            };
        }
        function updateUserProfile(event) {
            return __awaiter(this, void 0, void 0, function* () {
                window.onbeforeunload = null;
                event.preventDefault();
                const updatedData = {
                    about: descriptionField.value,
                    first_name: nameField.value.toLowerCase(),
                    last_name: lastNameField.value.toLowerCase(),
                    patronymic: patronymicField.value.toLowerCase(),
                    birth_date: birthDateField.value,
                    balance: balance.innerHTML // это костыль для моки
                };
                const response = yield fetch(requestURLUpdate, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(updatedData)
                });
                if (response.ok) {
                    location.reload();
                }
                else {
                    handleFetchError(response.status, 'user');
                }
            });
        }
        const sendMoneyForm = document.querySelector('#send-money');
        const promocodeField = sendMoneyForm.elements.namedItem('promocode');
        sendMoneyForm.addEventListener('submit', sendPromocode);
        function sendPromocode(event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.BALANCE}`;
                const promocode = {
                    promo_code: promocodeField.value
                };
                const response = yield fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(promocode)
                });
                if (response.ok) {
                    const currentBalance = yield response.json();
                    balance.innerHTML = currentBalance.current_balance || 10000; // ответа нет в моках
                }
                else {
                    handleFetchError(response.status, 'user');
                }
            });
        }
    });
}
