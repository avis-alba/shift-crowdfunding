import * as requests from './requests.js';

export default async function createProject(): Promise<void> {
	if (window.location.href !== `${requests.siteOrigin}create-project.html`) return;

	let requestURL: string = `${requests.requestOrigin}${requests.requestURLs.POST.createProgect}`;

	let form: HTMLFormElement = document.querySelector('#create-project') as HTMLFormElement;
	let cancelButton: HTMLInputElement = form.elements[7] as HTMLInputElement;

	window.onbeforeunload = function (): boolean { return false };

	cancelButton.onclick = function (): void {
		window.location.href = document.referrer;
	};

	let sendProjectData: SendProjectDataFunc = makeProjectDataRequest(requestURL, 'POST');

	form.addEventListener('submit', sendProjectData);
}

export function makeProjectDataRequest(requestURL: string, method: string): SendProjectDataFunc {

	return async function (event: Event): Promise<void> {

		window.onbeforeunload = null;
		event.preventDefault();

		let form: HTMLFormElement = document.querySelector('.main-form') as HTMLFormElement;

		let nameField: HTMLInputElement = form.elements[0] as HTMLInputElement;
		let categoryField: HTMLInputElement = form.elements[1] as HTMLInputElement;
		let moneyField: HTMLInputElement = form.elements[2] as HTMLInputElement;
		let dateField: HTMLInputElement = form.elements[3] as HTMLInputElement;
		let videoField: HTMLInputElement = form.elements[4] as HTMLInputElement;
		let descriptionField: HTMLInputElement = form.elements[5] as HTMLInputElement;

		let projectData: ProjectData = {

			project_name: nameField.value,
			category: categoryField.value,
			required_amount: moneyField.value,
			donation_deadline: dateField.value,
			video_widget: videoField.value,
			description: descriptionField.value

		};

		let response: Response = await fetch(requestURL, {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(projectData)
		});

		if (response.ok) {

			if (window.location.href.includes('edit-project.html?id=')) {

				window.location.href = `${requests.siteOrigin}project-item.html?id=${requests.projectId}`;

			} else if (window.location.href === `${requests.siteOrigin}create-project.html`) {

				window.location.href = `${requests.siteOrigin}my-projects.html`;

			}

		} else if (`${response.status}`[0] === '4') {

			response.status === 409 ? alert('Имя проекта совпадает с уже существующим!') : null;

			alert('Ошибка отправки формы!');

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}

	}
}