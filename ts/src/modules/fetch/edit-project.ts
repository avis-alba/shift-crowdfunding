import * as REQUESTS from './requests';
import { makeProjectDataRequest } from './create-project';
import getFormFields from '../get-formfields';
import handleFetchError from './error-handler';

export default async function editProject(): Promise<void> {

	if (!location.href.includes('edit-project.html?id=')) return;

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECT_BY_ID}`;
	const requestURLEdit: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.PUT.EDIT_PROJECT}`;

	const form: HTMLFormElement = document.querySelector('#edit-project') as HTMLFormElement;
	const formFields: HTMLInputElement[] = getFormFields(form);

	const [nameField, categoryField, moneyField, dateField, videoField, descriptionField, submitButton, cancelButton, deleteButton] = formFields;

	const response: Response = await fetch(requestURL);

	if (response.ok) {

		const project = await response.json();   //типизировать ответ с бэка

		nameField.value = project.project_name;
		categoryField.value = project.category;
		moneyField.value = project.required_amount;
		dateField.value = project.donation_deadline;
		videoField.value = project.video_widget;
		descriptionField.value = project.description;

	} else {

		handleFetchError(response.status, 'project');

	}

	for (let field of formFields) {

		field.onchange = function (): void {
			window.onbeforeunload = function (): boolean { return false };
		}
	}

	cancelButton.onclick = function (): void {
		location.href = document.referrer;
	};

	deleteButton.addEventListener('click', deleteProject);

	const sendProjectData: SendProjectData = makeProjectDataRequest(requestURLEdit, 'PUT');

	form.addEventListener('submit', sendProjectData);
}

export async function deleteProject(): Promise<void> {

	if (!confirm('Вы действительно хотите удалить проект?')) return;

	const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.DELETE.DELETE_PROJECT}`;

	const response: Response = await fetch(requestURL, { method: 'DELETE' });
	location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html` // костыль для моки

	if (response.ok) {

		alert('Проект удален');
		location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`;

	} else {

		handleFetchError(response.status, 'project');

	}
}