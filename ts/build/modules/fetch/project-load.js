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
import getCookies from './get-cookies.js';
import createSpinner from '../create-spinner.js';
import { createBackground } from '../create-spinner.js';
import { deleteProject } from './edit-project.js';
import handleFetchError from './error-handler.js';
export default function getProjectInfo() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!location.href.includes('project-item.html?id='))
            return;
        showAdditionalForm();
        const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECT_BY_ID}`;
        const requestURLDonation = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.DONATE_TO_PROJECT}`;
        const projectName = document.querySelector('#project-name');
        const projectCategory = document.querySelector('#project-category');
        const projectDescription = document.querySelector('#project-description');
        const projectVideo = document.querySelector('#project-video');
        const sidebar = document.querySelector('#project-sidebar');
        const adminMenu = document.querySelector('#project-management');
        const spinner = createSpinner();
        const spinnerBackground = createBackground();
        spinner.style.top = '250px';
        spinner.style.left = `${document.documentElement.clientWidth / 2 - 18}px`;
        document.body.append(spinnerBackground);
        document.body.append(spinner);
        const response = yield fetch(requestURL);
        if (response.ok) {
            const project = yield response.json(); // типизировать ответ с бэка
            spinner.remove();
            spinnerBackground.remove();
            const name = project.project_name;
            const category = project.category;
            const description = project.description;
            const video = project.video_widget;
            const collectedAmount = project.collected_amount;
            const requiredAmount = project.required_amount;
            const authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
            const authorName = project.author.first_name[0].toUpperCase();
            const authorPatronymic = project.author.patronymic[0].toUpperCase();
            const formatter = new Intl.DateTimeFormat();
            const deadline = formatter.format(new Date(project.donation_deadline));
            projectName.innerHTML = name;
            projectDescription.innerHTML = `<p>${description}</p>`;
            projectCategory.innerHTML = `<p>${category}</p>`;
            if (video) {
                projectVideo.style.display = 'block';
                const iframe = document.createElement('iframe');
                projectVideo.append(iframe);
                iframe.outerHTML = `<iframe width="560" height="315" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`;
            }
            const sidebarTemplate = `
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
            if (((_a = getCookies()) === null || _a === void 0 ? void 0 : _a.login) === project.author.login) {
                adminMenu.style.display = 'block';
                const editButton = adminMenu.querySelector('#edit');
                const sendMoneyButton = adminMenu.querySelector('#withdraw');
                const deleteButton = adminMenu.querySelector('#delete');
                editButton.onclick = function () {
                    location.href = `${REQUESTS.SITE_ORIGIN}edit-project.html?id=${REQUESTS.PROJECT_ID}`;
                };
                if (+collectedAmount >= +requiredAmount)
                    sendMoneyButton.setAttribute('style', '');
                deleteButton.addEventListener('click', deleteProject);
            }
            const donationForm = sidebar.querySelector('#fund');
            const moneyField = donationForm.elements.namedItem('donation');
            const money = {
                amount: moneyField.value
            };
            donationForm.addEventListener('submit', donateToProject);
            function donateToProject(event) {
                return __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    console.log(money);
                    const response = yield fetch(`${REQUESTS.REQUEST_ORIGIN}donate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(money)
                    });
                    if (response.ok) {
                        location.reload();
                    }
                    else if (response.status === 409 /* ERROR_CODES.CONFLICT */) {
                        alert('Недостаточно средств!');
                        return;
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
