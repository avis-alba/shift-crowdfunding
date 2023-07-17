var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getCookies from './get-cookies.js';
import * as requests from './requests.js';
export default function pageLoad() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const buttons = document.querySelectorAll('.login');
        const login = (_a = getCookies()) === null || _a === void 0 ? void 0 : _a.login;
        if (login) {
            const registrationButton = document.querySelector('#registration');
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
