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
import { makeProjectDataRequest } from './create-project.js';
import getFormFields from '../get-formfields.js';
import handleFetchError from './error-handler.js';
export default function editProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!location.href.includes('edit-project.html?id='))
            return;
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECT_BY_ID}`;
        const requestURLEdit = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.PUT.EDIT_PROJECT}`;
        const form = document.querySelector('#edit-project');
        const formFields = getFormFields(form);
        const [nameField, categoryField, moneyField, dateField, videoField, descriptionField, submitButton, cancelButton, deleteButton] = formFields;
        const response = yield fetch(requestURL);
        if (response.ok) {
            const project = yield response.json(); //типизировать ответ с бэка
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
        for (let field of formFields) {
            field.onchange = function () {
                window.onbeforeunload = function () { return false; };
            };
        }
        cancelButton.onclick = function () {
            location.href = document.referrer;
        };
        deleteButton.addEventListener('click', deleteProject);
        const sendProjectData = makeProjectDataRequest(requestURLEdit, 'PUT');
        form.addEventListener('submit', sendProjectData);
    });
}
export function deleteProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!confirm('Вы действительно хотите удалить проект?'))
            return;
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.DELETE.DELETE_PROJECT}`;
        const response = yield fetch(requestURL, { method: 'DELETE' });
        location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`; // костыль для моки
        if (response.ok) {
            alert('Проект удален');
            location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`;
        }
        else {
            handleFetchError(response.status, 'project');
        }
    });
}
