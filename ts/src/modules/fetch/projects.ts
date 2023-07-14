import * as requests from './requests.js';
import createSpinner from './create-spinner.js';

export default async function getProjects() {
	let projectContainer: HTMLDivElement | null = document.querySelector('.projects-body');

	if (!projectContainer) return;

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

		let sortForm: HTMLFormElement = document.querySelector('#sort') as HTMLFormElement;
		let category: HTMLSelectElement = sortForm.elements[0] as HTMLSelectElement;
		let sortType: HTMLSelectElement = sortForm.elements[1] as HTMLSelectElement;

		sortForm.addEventListener('submit', showSortedProjects);

		function sortedProjectsRequest(): string {

			let sortTypeValues = sortType.value.split(',');
			let queryParams = `?sorting_enabled=true&is_ascending=${sortTypeValues[1]}&category=${category.value}&mode=${sortTypeValues[0]}`;
			return queryParams;
		}

		function showSortedProjects(event: Event) {

			event.preventDefault();
			location.search = sortedProjectsRequest();
			showProjects();
		}

		let filterForm: HTMLFormElement = document.querySelector('#filter') as HTMLFormElement;
		let minSumm: HTMLInputElement = filterForm.elements[0] as HTMLInputElement;
		let maxSumm: HTMLInputElement = filterForm.elements[1] as HTMLInputElement;

		filterForm.addEventListener('submit', showFilteredProjects);

		function filteredProjectsRequest(): string {

			let queryParams = `?filter_required_amount=true&min_amount=${minSumm.value}&max_amount=${maxSumm.value}`;
			return queryParams;
		}

		function showFilteredProjects(event: Event) {

			event.preventDefault();
			location.search = filteredProjectsRequest();
			showProjects();
		}

		let searchForm: HTMLFormElement = document.querySelector('#search') as HTMLFormElement;
		let searchField: HTMLInputElement = searchForm.elements[0] as HTMLInputElement;

		searchForm.addEventListener('submit', showSearchedProjects);

		function searchProjectsRequest(): string {

			let queryParams = `?project_name=${searchField.value}`;
			return queryParams;
		}

		function showSearchedProjects(event: Event) {

			event.preventDefault();
			location.search = searchProjectsRequest();
			showProjects();
		}

	}

	async function showProjects() {

		if (window.location.href.includes('?')) {

			let params = location.search;
			requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projects}${params}`;
		}

		let response = await fetch(requestURL);

		spinner.style.display = 'none';

		if (response.ok) {

			let projects = await response.json();

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
				projectContainer?.append(projectCard);
			}

			// if (window.location.href.includes('?sorting_enabled')) alert('Проекты отсортированы по вашим параметрам');

		} else if (`${response.status}`[0] === '4') {

			errorMessage.innerHTML = 'Ошибка запроса';
			projectContainer?.append(errorMessage);

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}
	}


}

