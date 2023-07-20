import * as REQUESTS from './requests';
import makeProjectCard from './make-project-card';
import handleFetchError from './error-handler';

export default async function showProjects(requestURL: string): Promise<void> {

	if (location.search) {

		const params: string = location.search;
		requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECTS}${params}`;
	}

	try {
		const response: Response = await fetch(requestURL);

		const projectContainer: HTMLDivElement = document.querySelector('.projects-body') as HTMLDivElement;
		const spinner: HTMLDivElement = document.querySelector('.spinner-border') as HTMLDivElement;
		spinner.style.display = 'none';

		if (response.ok) {

			const projects: ProjectDataToGet[] = await response.json();

			for (let project of projects) {

				project.author.last_name = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
				project.author.first_name = project.author.first_name[0].toUpperCase();
				project.author.patronymic = project.author.patronymic[0].toUpperCase();

				const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat();
				project.donation_deadline = formatter.format(new Date(project.donation_deadline));

				const projectLink: string = `${REQUESTS.SITE_ORIGIN}project-item.html?id=${project.project_id}`;

				const projectCard = makeProjectCard(project, projectLink);
				projectContainer?.append(projectCard);
			}

		} else {

			handleFetchError(response.status, 'project');

		}
	} catch (e) {

		if (e instanceof Error) {

			alert(`Ошибка при загрузке проектов: ${e.message}`);
		}
	}
}