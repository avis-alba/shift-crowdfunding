var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function pageLoad(event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('load');
        let buttons = document.querySelectorAll('.login');
        let cookieLogin = document.cookie.match(/user=.+/);
        let login;
        if (cookieLogin)
            login = cookieLogin[0].slice(5);
        if (login) {
            console.log('hascookie');
            console.log(login);
            for (let button of buttons) {
                button.innerHTML = '<a href="./user-profile.html">Мой профиль</a>';
                button.onclick = null;
            }
        }
    });
}
