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
import { makeProjectDataRequest } from './create-project.js';
import handleFetchError from './error-handler.js';
export default function editProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.location.href.includes('edit-project.html?id='))
            return;
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projectById}`;
        let requestURLEdit = `${requests.requestOrigin}${requests.requestURLs.PUT.editProject}`;
        let form = document.querySelector('#edit-project');
        let nameField = form.elements[0];
        let categoryField = form.elements[1];
        let moneyField = form.elements[2];
        let dateField = form.elements[3];
        let videoField = form.elements[4];
        let descriptionField = form.elements[5];
        let cancelButton = form.elements[7];
        let response = yield fetch(requestURL);
        if (response.ok) {
            let project = yield response.json(); //типизировать ответ с бэка
            nameField.value = project.project_name;
            categoryField.value = project.category;
            moneyField.value = project.required_amount;
            dateField.value = project.donation_deadline;
            videoField.value = project.video_widget;
            descriptionField.value = project.description;
        }
        else {
            handleFetchError(response.status, 'project');
        }
        let inputs = [nameField, categoryField, moneyField, dateField, videoField, descriptionField];
        for (let field of inputs) {
            field.onchange = function () {
                window.onbeforeunload = function () { return false; };
            };
        }
        cancelButton.onclick = function () {
            window.location.href = document.referrer;
        };
        let deleteButton = form.elements[8];
        deleteButton.addEventListener('click', deleteProject);
        let sendProjectData = makeProjectDataRequest(requestURLEdit, 'PUT');
        form.addEventListener('submit', sendProjectData);
    });
}
export function deleteProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!confirm('Вы действительно хотите удалить проект?'))
            return;
        let requestURL = `${requests.siteOrigin}${requests.requestURLs.DELETE.deleteProjectById}`;
        let response = yield fetch(requestURL, { method: 'DELETE' });
        window.location.href = `${requests.siteOrigin}my-projects.html`; // костыль для моки
        if (response.ok) {
            alert('Проект удален');
            window.location.href = `${requests.siteOrigin}my-projects.html`;
        }
        else {
            handleFetchError(response.status, 'project');
        }
    });
}
