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
import showAdditionalForm from '../show-form.js';
import getCookies from './get-cookies.js';
import createSpinner from '../create-spinner.js';
import { createBackground } from '../create-spinner.js';
import { deleteProject } from './edit-project.js';
import { ERROR_CODES } from '../error-codes.js';
import handleFetchError from './error-handler.js';
export default function getProjectInfo() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.location.href.includes('project-item.html?id='))
            return;
        showAdditionalForm();
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projectById}`;
        let requestURLDonation = `${requests.requestOrigin}${requests.requestURLs.POST.donateToProject}`;
        let adminMenu = document.querySelector('.admin-menu');
        let projectName = document.querySelector('h1');
        let projectDescription = document.querySelector('.full-info-text');
        let projectVideo = document.querySelector('.full-info-video');
        let projectCategory = document.querySelector('.category');
        let sidebar = document.querySelector('.full-info-sidebar');
        let spinner = createSpinner();
        let spinnerBackground = createBackground();
        spinner.style.top = '250px';
        spinner.style.left = `${document.documentElement.clientWidth / 2 - 18}px`;
        document.body.append(spinnerBackground);
        document.body.append(spinner);
        let response = yield fetch(requestURL);
        if (response.ok) {
            let project = yield response.json(); // типизировать ответ с бэка
            spinner.remove();
            spinnerBackground.remove();
            let name = project.project_name;
            let category = project.category;
            let description = project.description;
            let video = project.video_widget;
            let collectedAmount = project.collected_amount;
            let requiredAmount = project.required_amount;
            let authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
            let authorName = project.author.first_name[0].toUpperCase();
            let authorPatronymic = project.author.patronymic[0].toUpperCase();
            let formatter = new Intl.DateTimeFormat();
            let deadline = formatter.format(new Date(project.donation_deadline));
            if (((_a = getCookies()) === null || _a === void 0 ? void 0 : _a.login) === project.author.login) {
                adminMenu.style.display = 'block';
                let editButton = adminMenu.querySelector('a');
                let sendMoneyButton = adminMenu.querySelector('#withdraw');
                let deleteButton = adminMenu.querySelector('#delete');
                editButton.href = editButton.href + requests.projectId;
                if (+collectedAmount >= +requiredAmount)
                    sendMoneyButton.setAttribute('style', '');
                deleteButton.addEventListener('click', deleteProject);
            }
            projectName.innerHTML = name;
            projectDescription.innerHTML = `<p>${description}</p>`;
            projectCategory.innerHTML = `<p>${category}</p>`;
            if (video) {
                projectVideo.style.display = 'block';
                let iframe = document.createElement('iframe');
                projectVideo.append(iframe);
                iframe.outerHTML = `<iframe width="560" height="315" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`;
            }
            let sidebarTemplate = `
					<p><strong>Собрано:</strong></p>
					<div class="sidebar-num">
						<p id="money">${collectedAmount} / ${requiredAmount}</p>
					</div>
					<p><strong>Окончание сбора:</strong></p>
					<div class="sidebar-num">
						<p id="time">${deadline}</p>
					</div>
					<p><strong>Автор:</strong></p>
					<p id="author">${authorLastName} ${authorName}.${authorPatronymic}.</p>
				`;
            sidebar.insertAdjacentHTML('afterbegin', sidebarTemplate);
            let donationForm = sidebar.querySelector('#fund');
            let moneyField = donationForm.elements[0];
            let money = {
                amount: moneyField.value
            };
            donationForm.addEventListener('submit', donateToProject);
            function donateToProject(event) {
                return __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    let response = yield fetch(`${requests.requestOrigin}donate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(money)
                    });
                    if (response.ok) {
                        location.reload();
                    }
                    else if (response.status === ERROR_CODES.CLIENT_ERROR.CONFLICT) {
                        alert('Недостаточно средств!');
                    }
                    else {
                        handleFetchError(response.status, 'project');
                    }
                });
            }
        }
        else {
            handleFetchError(response.status, 'project');
        }
    });
}
