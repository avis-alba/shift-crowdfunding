import * as requests from './requests.js';

export default async function createProject() {
	if (window.location.href !== `${requests.siteOrigin}create-project.html`) return;

	let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.createProgect}`;

	let form: HTMLFormElement = document.querySelector('#create-project') as HTMLFormElement;

	let nameField: HTMLInputElement = form.elements[0] as HTMLInputElement;
	let categoryField: HTMLInputElement = form.elements[1] as HTMLInputElement;
	let moneyField: HTMLInputElement = form.elements[2] as HTMLInputElement;
	let dateField: HTMLInputElement = form.elements[3] as HTMLInputElement;
	let videoField: HTMLInputElement = form.elements[4] as HTMLInputElement;
	let descriptionField: HTMLInputElement = form.elements[5] as HTMLInputElement;

	let cancelButton: HTMLInputElement = form.elements[7] as HTMLInputElement;

	window.onbeforeunload = function () { return false };

	cancelButton.onclick = function () {
		window.location.href = document.referrer;
	};

	form.addEventListener('submit', sendUserData);

	async function sendUserData(event: Event) {

		window.onbeforeunload = null;
		event.preventDefault();

		let projectData = {

			project_name: nameField.value,
			category: categoryField.value,
			required_amount: moneyField.value,
			donation_deadline: dateField.value,
			video_widget: videoField.value,
			description: descriptionField.value,

		};

		let response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(projectData)
		});

		if (response.ok) {

			window.location.href = `${requests.siteOrigin}my-projects.html`;

		} else if (`${response.status}`[0] === '4') {

			response.status == 409 ? alert('Проект с таким именем уже существует') : null;

			alert('Ошибка отправки формы!');

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}
	}






}