import * as REQUESTS from './requests';
import getFormFields from '../get-formfields';
import handleFetchError from './error-handler';

export default async function createProject(): Promise<void> {

	if (location.href !== `${REQUESTS.SITE_ORIGIN}create-project.html`) return;

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.CREATE_PROJECT}`;

	const form: HTMLFormElement = document.querySelector('#create-project') as HTMLFormElement;
	const cancelButton: HTMLInputElement = form.elements.namedItem('reset') as HTMLInputElement;

	window.onbeforeunload = function (): boolean { return false };

	cancelButton.onclick = function (): void {
		location.href = document.referrer;
	};

	const sendProjectData: SendProjectData = makeProjectDataRequest(requestURL, 'POST');

	form.addEventListener('submit', sendProjectData);
}

export function makeProjectDataRequest(requestURL: string, method: string): SendProjectData {

	return async function (event: Event): Promise<void> {

		window.onbeforeunload = null;
		event.preventDefault();

		const form: HTMLFormElement = document.querySelector('.main-form') as HTMLFormElement;
		const [nameField, categoryField, moneyField, dateField, videoField, descriptionField] = getFormFields(form);

		const projectData: ProjectData = {

			project_name: nameField.value.trim(),
			category: categoryField.value,
			required_amount: moneyField.value,
			donation_deadline: dateField.value,
			video_widget: videoField.value,
			description: descriptionField.value

		};

		const response: Response = await fetch(requestURL, {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(projectData)
		});

		if (response.ok) {

			if (location.href.includes('edit-project.html?id=')) {
				location.href = `${REQUESTS.SITE_ORIGIN}project-item.html?id=${REQUESTS.PROJECT_ID}`;

			} else if (location.href === `${REQUESTS.SITE_ORIGIN}create-project.html`) {
				location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`;
			}

		} else {

			handleFetchError(response.status, 'project');

		}
	}
}