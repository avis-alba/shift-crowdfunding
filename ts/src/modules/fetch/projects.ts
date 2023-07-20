import * as REQUESTS from './requests';
import createSpinner from '../create-spinner';
import getFormFields from '../get-formfields';
import showProjects from './show-project-feed';

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

	showProjects(requestURL);

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
			showProjects(requestURL);
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
			showProjects(requestURL);
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
			showProjects(requestURL);
		}

		searchForm.addEventListener('submit', showSearchedProjects);
	}
}

