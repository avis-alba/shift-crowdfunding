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
import createSpinner from './create-spinner.js';
export default function getProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        let projectContainer = document.querySelector('.projects-body');
        if (!projectContainer)
            return;
        let errorMessage = document.createElement('p');
        errorMessage.style.color = '#da467d';
        let spinner = createSpinner();
        spinner.style.position = 'static';
        projectContainer.append(spinner);
        let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projects}`;
        if (window.location.href === `${requests.siteOrigin}my-projects.html`) {
            requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.userProjects}`;
        }
        showProjects();
        if (window.location.href.includes('/projects.html')) {
            let sortForm = document.querySelector('#sort');
            let category = sortForm.elements[0];
            let sortType = sortForm.elements[1];
            sortForm.addEventListener('submit', showSortedProjects);
            function sortedProjectsRequest() {
                let sortTypeValues = sortType.value.split(',');
                let queryParams = `?sorting_enabled=true&is_ascending=${sortTypeValues[1]}&category=${category.value}&mode=${sortTypeValues[0]}`;
                return queryParams;
            }
            function showSortedProjects(event) {
                event.preventDefault();
                location.search = sortedProjectsRequest();
                showProjects();
            }
            let filterForm = document.querySelector('#filter');
            let minSumm = filterForm.elements[0];
            let maxSumm = filterForm.elements[1];
            filterForm.addEventListener('submit', showFilteredProjects);
            function filteredProjectsRequest() {
                let queryParams = `?filter_required_amount=true&min_amount=${minSumm.value}&max_amount=${maxSumm.value}`;
                return queryParams;
            }
            function showFilteredProjects(event) {
                event.preventDefault();
                location.search = filteredProjectsRequest();
                showProjects();
            }
            let searchForm = document.querySelector('#search');
            let searchField = searchForm.elements[0];
            searchForm.addEventListener('submit', showSearchedProjects);
            function searchProjectsRequest() {
                let queryParams = `?project_name=${searchField.value}`;
                return queryParams;
            }
            function showSearchedProjects(event) {
                event.preventDefault();
                location.search = searchProjectsRequest();
                showProjects();
            }
        }
        function showProjects() {
            return __awaiter(this, void 0, void 0, function* () {
                if (window.location.href.includes('?')) {
                    let params = location.search;
                    requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projects}${params}`;
                }
                let response = yield fetch(requestURL);
                spinner.style.display = 'none';
                if (response.ok) {
                    let projects = yield response.json();
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
                        projectContainer === null || projectContainer === void 0 ? void 0 : projectContainer.append(projectCard);
                    }
                    // if (window.location.href.includes('?sorting_enabled')) alert('Проекты отсортированы по вашим параметрам');
                }
                else if (`${response.status}`[0] === '4') {
                    errorMessage.innerHTML = 'Ошибка запроса';
                    projectContainer === null || projectContainer === void 0 ? void 0 : projectContainer.append(errorMessage);
                }
                else if (`${response.status}`[0] === '5') {
                    alert('Ошибка сервера!');
                }
            });
        }
    });
}
