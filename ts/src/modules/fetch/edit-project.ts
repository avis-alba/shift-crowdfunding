import * as requests from './requests.js';
import { makeProjectDataRequest } from './create-project.js';

export default async function editProject(): Promise<void> {

	if (!window.location.href.includes('edit-project.html?id=')) return;

	let requestURL: string = `${requests.requestOrigin}${requests.requestURLs.GET.projectById}`;

	let response: Response = await fetch(requestURL);

	let form: HTMLFormElement = document.querySelector('#edit-project') as HTMLFormElement;

	let nameField: HTMLInputElement = form.elements[0] as HTMLInputElement;
	let categoryField: HTMLSelectElement = form.elements[1] as HTMLSelectElement;
	let moneyField: HTMLInputElement = form.elements[2] as HTMLInputElement;
	let dateField: HTMLInputElement = form.elements[3] as HTMLInputElement;
	let videoField: HTMLInputElement = form.elements[4] as HTMLInputElement;
	let descriptionField: HTMLInputElement = form.elements[5] as HTMLInputElement;

	let cancelButton: HTMLInputElement = form.elements[7] as HTMLInputElement;

	cancelButton.onclick = function (): void {
		window.location.href = document.referrer;
	};

	let deleteButton: HTMLInputElement = form.elements[8] as HTMLInputElement;
	deleteButton.addEventListener('click', deleteProject);

	async function deleteProject(): Promise<void> {
		if (!confirm('Вы действительно хотите удалить проект?')) return;

		let response: Response = await fetch(requestURL, { method: 'DELETE' });
		window.location.href = `${requests.siteOrigin}my-projects.html` // костыль для моки

		if (response.ok) {

			alert('Проект удален');
			window.location.href = `${requests.siteOrigin}my-projects.html`

		} else if (`${response.status}`[0] === '4') {

			// alert('Ошибка запроса!'); удалено для работы моки

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}
	}

	let sendProjectData: SendProjectDataFunc = makeProjectDataRequest(requestURL, 'PUT');

	form.addEventListener('submit', sendProjectData);

	if (response.ok) {

		let project = await response.json();   //типизировать ответ с бэка

		nameField.value = project.project_name;
		categoryField.value = project.category;
		moneyField.value = project.required_amount;
		dateField.value = project.donation_deadline;
		videoField.value = project.video_widget;
		descriptionField.value = project.description;

	} else if (`${response.status}`[0] === '4') {

		alert('Ошибка загрузки');


	} else if (`${response.status}`[0] === '5') {

		alert('Ошибка сервера!');
	}

	let inputs: HTMLElement[] = [nameField, categoryField, moneyField, dateField, videoField, descriptionField];

	for (let field of inputs) {
		field.onchange = function (): void {

			window.onbeforeunload = function (): boolean { return false };
		}
	}

}