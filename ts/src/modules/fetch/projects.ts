import * as REQUESTS from './requests.js';
import createSpinner from '../create-spinner.js';
import handleFetchError from './error-handler.js';
import getFormFields from '../get-formfields.js';

export default async function getProjects(): Promise<void> {

	const projectContainer: HTMLDivElement | null = document.querySelector('.projects-body');

	if (!projectContainer) return;

	const spinner: HTMLDivElement = createSpinner();
	spinner.style.position = 'static';

	projectContainer.append(spinner);

	let requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECTS}`;

	if (location.href === `${REQUESTS.SITE_ORIGIN}my-projects.html`) {

		requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.USER_PROJECTS}`;

	}

	showProjects();

	if (location.href.includes('/projects.html')) {

		const sortForm: HTMLFormElement = document.querySelector('#sort') as HTMLFormElement;
		const [category, sortType] = getFormFields(sortForm);

		function sortedProjectsRequest(): string {

			const sortTypeValues: string[] = sortType.value.split(',');
			const queryParams: string = `?sorting_enabled=true&is_ascending=${sortTypeValues[1]}&category=${category.value}&mode=${sortTypeValues[0]}`;
			return queryParams;
		}

		function showSortedProjects(event: Event): void {

			event.preventDefault();
			location.search = sortedProjectsRequest();
			showProjects();
		}

		sortForm.addEventListener('submit', showSortedProjects);

		const filterForm: HTMLFormElement = document.querySelector('#filter') as HTMLFormElement;
		const [minSumm, maxSumm] = getFormFields(filterForm);

		function filteredProjectsRequest(): string {

			const queryParams: string = `?filter_required_amount=true&min_amount=${minSumm.value}&max_amount=${maxSumm.value}`;
			return queryParams;
		}

		function showFilteredProjects(event: Event): void {

			event.preventDefault();
			location.search = filteredProjectsRequest();
			showProjects();
		}

		filterForm.addEventListener('submit', showFilteredProjects);

		const searchForm: HTMLFormElement = document.querySelector('#search') as HTMLFormElement;
		const searchField: HTMLInputElement = searchForm.elements.namedItem('search-by-name') as HTMLInputElement;


		function searchProjectsRequest(): string {

			const queryParams: string = `?project_name=${searchField.value}`;
			return queryParams;
		}

		function showSearchedProjects(event: Event): void {

			event.preventDefault();
			location.search = searchProjectsRequest();
			showProjects();
		}

		searchForm.addEventListener('submit', showSearchedProjects);
	}

	async function showProjects(): Promise<void> {

		if (location.search) {

			const params: string = location.search;
			requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECTS}${params}`;
		}

		const response: Response = await fetch(requestURL);

		spinner.style.display = 'none';

		if (response.ok) {

			const projects = await response.json();

			for (let project of projects) {

				const projectName = project.project_name;
				const authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
				const authorName = project.author.first_name[0].toUpperCase();
				const authorPatronymic = project.author.patronymic[0].toUpperCase();
				const description = project.description;
				const collectedAmount = project.collected_amount;
				const requiredAmount = project.required_amount;

				const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat();
				const deadline: string = formatter.format(new Date(project.donation_deadline));


				const projectTemplate: string = `
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
				const projectCard: HTMLAnchorElement = document.createElement('a');
				projectCard.href = `${REQUESTS.SITE_ORIGIN}project-item.html?id=${project.project_id}`;
				projectCard.innerHTML = projectTemplate;
				projectContainer?.append(projectCard);
			}

		} else {

			handleFetchError(response.status, 'project');

		}
	}
}

