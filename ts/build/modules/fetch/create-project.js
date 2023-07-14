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
export default function createProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (window.location.href !== `${requests.siteOrigin}create-project.html`)
            return;
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.createProgect}`;
        let form = document.querySelector('#create-project');
        let cancelButton = form.elements[7];
        window.onbeforeunload = function () { return false; };
        cancelButton.onclick = function () {
            window.location.href = document.referrer;
        };
        let sendProjectData = makeProjectDataRequest(requestURL);
        form.addEventListener('submit', sendProjectData);
    });
}
export function makeProjectDataRequest(requestURL) {
    return function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            window.onbeforeunload = null;
            event.preventDefault();
            let form = document.querySelector('.main-form');
            // if (window.location.href.includes('edit-project.html?id=')) {
            // 	form = document.querySelector('#edit-project') as HTMLFormElement;
            // } else if (window.location.href === `${requests.siteOrigin}create-project.html`) {
            // 	form = document.querySelector('#create-project') as HTMLFormElement;
            // }
            let nameField = form.elements[0];
            let categoryField = form.elements[1];
            let moneyField = form.elements[2];
            let dateField = form.elements[3];
            let videoField = form.elements[4];
            let descriptionField = form.elements[5];
            let projectData = {
                project_name: nameField.value,
                category: categoryField.value,
                required_amount: moneyField.value,
                donation_deadline: dateField.value,
                video_widget: videoField.value,
                description: descriptionField.value
            };
            let response = yield fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(projectData)
            });
            if (response.ok) {
                if (window.location.href.includes('edit-project.html?id=')) {
                    window.location.href = `${requests.siteOrigin}project-item.html?id=${requests.projectId}`;
                }
                else if (window.location.href === `${requests.siteOrigin}create-project.html`) {
                    window.location.href = `${requests.siteOrigin}my-projects.html`;
                }
            }
            else if (`${response.status}`[0] === '4') {
                response.status === 409 ? alert('Имя проекта совпадает с уже существующим!') : null;
                alert('Ошибка отправки формы!');
            }
            else if (`${response.status}`[0] === '5') {
                alert('Ошибка сервера!');
            }
        });
    };
}