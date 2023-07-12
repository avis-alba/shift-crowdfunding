import { formFieldsRegExp } from './regexp.js';
export default function addFormFieldLimits() {
    var _a, _b, _c, _d;
    let lastname = document.querySelector('#lastname');
    let name = document.querySelector('#name');
    let patronymic = document.querySelector('#patronymic');
    let login = document.querySelector('#login');
    let password = document.querySelector('#password');
    let projectName = document.querySelector('#project-name');
    let popupLogin = document.querySelector('#popup-login');
    let popupPassword = document.querySelector('#popup-password');
    let youtubeURL = document.querySelector('#url');
    let date = document.querySelector('#date');
    let minSumm = document.querySelector('#min-summ');
    let maxSumm = document.querySelector('#max-summ');
    if (lastname)
        lastname.pattern = formFieldsRegExp.userName;
    if (name)
        name.pattern = formFieldsRegExp.userName;
    if (patronymic)
        patronymic.pattern = formFieldsRegExp.userName;
    if (login)
        login.pattern = formFieldsRegExp.login;
    if (password)
        password.pattern = formFieldsRegExp.password;
    if (projectName)
        projectName.pattern = formFieldsRegExp.projectName;
    if (popupLogin)
        popupLogin.pattern = formFieldsRegExp.login;
    if (popupPassword)
        popupPassword.pattern = formFieldsRegExp.password;
    if (youtubeURL)
        youtubeURL.pattern = formFieldsRegExp.youtubeURL;
    let currentDate = new Date();
    let year = currentDate.getFullYear().toString();
    let allowedYear = (currentDate.getFullYear() - 18).toString();
    let month = (currentDate.getMonth() + 1).toString();
    let day = currentDate.getDate().toString();
    let nextDay = (currentDate.getDate() + 1).toString();
    // let previousDay: string = (currentDate.getDate() - 1).toString();
    if (month.length === 1)
        month = '0' + month;
    if (nextDay.length === 1)
        nextDay = '0' + nextDay;
    if (day.length === 1)
        day = '0' + day;
    let minDateProject = `${year}-${month}-${nextDay}`;
    let maxDateProject = `2100-01-01`;
    let maxDateUser = `${allowedYear}-${month}-${day}`;
    if (date) {
        if (((_a = date.parentElement) === null || _a === void 0 ? void 0 : _a.matches('#create-project')) || ((_b = date.parentElement) === null || _b === void 0 ? void 0 : _b.matches('#edit-project'))) {
            date.min = minDateProject;
            date.max = maxDateProject;
        }
        if (((_c = date.parentElement) === null || _c === void 0 ? void 0 : _c.matches('#create-user')) || ((_d = date.parentElement) === null || _d === void 0 ? void 0 : _d.matches('#edit-user'))) {
            date.max = maxDateUser;
        }
    }
    function setFilterlimits(event) {
        if (minSumm && maxSumm) {
            if (event.target === minSumm) {
                maxSumm.min = (+minSumm.value + 1).toString();
            }
            if (event.target === maxSumm) {
                +minSumm.value > +maxSumm.value ?
                    maxSumm.min = (+minSumm.value + 1).toString() :
                    minSumm.max = (+maxSumm.value - 1).toString();
            }
        }
    }
    if (minSumm)
        minSumm.addEventListener('change', setFilterlimits);
    if (maxSumm)
        maxSumm.addEventListener('change', setFilterlimits);
}
