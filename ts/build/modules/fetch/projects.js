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
import createSpinner from '../create-spinner.js';
import handleFetchError from './error-handler.js';
import getFormFields from '../get-formfields.js';
export default function getProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectContainer = document.querySelector('.projects-body');
        if (!projectContainer)
            return;
        const spinner = createSpinner();
        spinner.style.position = 'static';
        projectContainer.append(spinner);
        let requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECTS}`;
        if (location.href === `${REQUESTS.SITE_ORIGIN}my-projects.html`) {
            requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.USER_PROJECTS}`;
        }
        showProjects();
        if (location.href.includes('/projects.html')) {
            const sortForm = document.querySelector('#sort');
            const [category, sortType] = getFormFields(sortForm);
            function sortedProjectsRequest() {
                const sortTypeValues = sortType.value.split(',');
                const queryParams = `?sorting_enabled=true&is_ascending=${sortTypeValues[1]}&category=${category.value}&mode=${sortTypeValues[0]}`;
                return queryParams;
            }
            function showSortedProjects(event) {
                event.preventDefault();
                location.search = sortedProjectsRequest();
                showProjects();
            }
            sortForm.addEventListener('submit', showSortedProjects);
            const filterForm = document.querySelector('#filter');
            const [minSumm, maxSumm] = getFormFields(filterForm);
            function filteredProjectsRequest() {
                const queryParams = `?filter_required_amount=true&min_amount=${minSumm.value}&max_amount=${maxSumm.value}`;
                return queryParams;
            }
            function showFilteredProjects(event) {
                event.preventDefault();
                location.search = filteredProjectsRequest();
                showProjects();
            }
            filterForm.addEventListener('submit', showFilteredProjects);
            const searchForm = document.querySelector('#search');
            const searchField = searchForm.elements.namedItem('search-by-name');
            function searchProjectsRequest() {
                const queryParams = `?project_name=${searchField.value}`;
                return queryParams;
            }
            function showSearchedProjects(event) {
                event.preventDefault();
                location.search = searchProjectsRequest();
                showProjects();
            }
            searchForm.addEventListener('submit', showSearchedProjects);
        }
        function showProjects() {
            return __awaiter(this, void 0, void 0, function* () {
                if (location.search) {
                    const params = location.search;
                    requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECTS}${params}`;
                }
                const response = yield fetch(requestURL);
                spinner.style.display = 'none';
                if (response.ok) {
                    const projects = yield response.json();
                    for (let project of projects) {
                        const projectName = project.project_name;
                        const authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
                        const authorName = project.author.first_name[0].toUpperCase();
                        const authorPatronymic = project.author.patronymic[0].toUpperCase();
                        const description = project.description;
                        const collectedAmount = project.collected_amount;
                        const requiredAmount = project.required_amount;
                        const formatter = new Intl.DateTimeFormat();
                        const deadline = formatter.format(new Date(project.donation_deadline));
                        const projectTemplate = `
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
                        const projectCard = document.createElement('a');
                        projectCard.href = `${REQUESTS.SITE_ORIGIN}project-item.html?id=${project.project_id}`;
                        projectCard.innerHTML = projectTemplate;
                        projectContainer === null || projectContainer === void 0 ? void 0 : projectContainer.append(projectCard);
                    }
                }
                else {
                    handleFetchError(response.status, 'project');
                }
            });
        }
    });
}
