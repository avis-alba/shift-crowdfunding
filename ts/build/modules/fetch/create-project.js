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
import getFormFields from '../get-formfields.js';
import handleFetchError from './error-handler.js';
export default function createProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (location.href !== `${REQUESTS.SITE_ORIGIN}create-project.html`)
            return;
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.CREATE_PROJECT}`;
        const form = document.querySelector('#create-project');
        const cancelButton = form.elements.namedItem('reset');
        window.onbeforeunload = function () { return false; };
        cancelButton.onclick = function () {
            location.href = document.referrer;
        };
        const sendProjectData = makeProjectDataRequest(requestURL, 'POST');
        form.addEventListener('submit', sendProjectData);
    });
}
export function makeProjectDataRequest(requestURL, method) {
    return function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            window.onbeforeunload = null;
            event.preventDefault();
            const form = document.querySelector('.main-form');
            const [nameField, categoryField, moneyField, dateField, videoField, descriptionField] = getFormFields(form);
            const projectData = {
                project_name: nameField.value.trim(),
                category: categoryField.value,
                required_amount: moneyField.value,
                donation_deadline: dateField.value,
                video_widget: videoField.value,
                description: descriptionField.value
            };
            const response = yield fetch(requestURL, {
                method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(projectData)
            });
            if (response.ok) {
                if (location.href.includes('edit-project.html?id=')) {
                    location.href = `${REQUESTS.SITE_ORIGIN}project-item.html?id=${REQUESTS.PROJECT_ID}`;
                }
                else if (location.href === `${REQUESTS.SITE_ORIGIN}create-project.html`) {
                    location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`;
                }
            }
            else {
                handleFetchError(response.status, 'project');
            }
        });
    };
}
