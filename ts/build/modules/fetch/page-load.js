var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getLoginFromCookie from './get-login.js';
import * as requests from './requests.js';
export default function pageLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        let buttons = document.querySelectorAll('.login');
        let login = getLoginFromCookie();
        if (login) {
            let registrationButton = document.querySelector('#registration');
            if (registrationButton)
                registrationButton.href = './user-profile.html';
            for (let button of buttons) {
                button.innerHTML = 'Мой профиль';
                button.onclick = function () {
                    window.location.href = `${requests.siteOrigin}user-profile.html`;
                };
            }
        }
    });
}
