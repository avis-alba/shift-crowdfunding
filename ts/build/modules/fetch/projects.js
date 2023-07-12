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
export default function getProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        let projectContainer = document.querySelector('.projects-body');
        if (!projectContainer)
            return;
        let errorMessage = document.createElement('p');
        errorMessage.style.color = '#da467d';
        let spinner = document.createElement('div');
        spinner.classList.add('spinner-border');
        spinner.setAttribute('role', 'status');
        spinner.style.position = 'static';
        projectContainer.append(spinner);
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projects}`;
        if (window.location.href === 'http://127.0.0.1:5500/html/my-projects.html') {
            let cookieLogin = document.cookie.match(/user=.+/);
            let login;
            if (cookieLogin)
                login = cookieLogin[0].slice(5);
            requestURL = `${requests.requestOrigin}${login}/${requests.requestURLs.GET.projects}`;
        }
        let response = yield fetch(`${requestURL}`);
        spinner.setAttribute('style', 'display: none');
        if (response.ok) {
            let projects = yield response.json();
            spinner.style.display = 'none';
            for (let project of projects) {
                let projectName = project.project_name;
                let authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
                let authorName = project.author.first_name[0].toUpperCase();
                let authorPatronymic = project.author.patronymic[0].toUpperCase();
                let description = project.description;
                let collectedAmount = project.collected_amount;
                let requiredAmount = project.required_amount;
                let formatter = new Intl.DateTimeFormat();
                let deadline = formatter.format(new Date(project.donation_deadline));
                let projectTemplate = `
							<div class="projects-item">
								<div class="item-name">
									<h3>${projectName}</h3>
								</div>
								<div class="item-body">
									<div class="item-description">
										${description}
									</div>
									<div class="item-info">
										<p><strong>Собрано:</strong></p>
										<p id="money">${collectedAmount} / ${requiredAmount}</p>
										<p><strong>Окончание сбора:</strong></p>
										<p id="time">${deadline}</p>
										<p><strong>Автор:</strong></p>
										<p id="author">${authorLastName} ${authorName}.${authorPatronymic}.</p>
									</div>
								</div>
							</div>
								`;
                let projectCard = document.createElement('a');
                projectCard.href = `${requests.siteOrigin}project-item.html?id=${project.project_id}`;
                projectCard.innerHTML = projectTemplate;
                projectContainer.append(projectCard);
            }
        }
        else if (`${response.status}`[0] === '4') {
            response.json().then((response) => {
                errorMessage.innerHTML = response.message || 'Ошибка запроса';
                projectContainer === null || projectContainer === void 0 ? void 0 : projectContainer.append(errorMessage);
            }).catch((error) => {
                alert(error.message);
            });
        }
        else if (`${response.status}`[0] === '5') {
            alert('Ошибка сервера!');
        }
    });
}
