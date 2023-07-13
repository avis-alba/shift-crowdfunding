import * as requests from './requests.js';

export default async function createUser() {
	if (window.location.href !== `${requests.siteOrigin}create-user.html`) return;

	let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.registration}`;

	let form: HTMLFormElement = document.querySelector('#create-user') as HTMLFormElement;

	let lastNameField: HTMLInputElement = form.elements[0] as HTMLInputElement;
	let nameField: HTMLInputElement = form.elements[1] as HTMLInputElement;
	let patronymicField: HTMLInputElement = form.elements[2] as HTMLInputElement;
	let birthDateField: HTMLInputElement = form.elements[3] as HTMLInputElement;
	let loginField: HTMLInputElement = form.elements[4] as HTMLInputElement;
	let passwordField: HTMLInputElement = form.elements[5] as HTMLInputElement;
	let repeatPasswordField: HTMLInputElement = form.elements[6] as HTMLInputElement;
	let descriptionField: HTMLInputElement = form.elements[7] as HTMLInputElement;

	let cancelButton: HTMLInputElement = form.elements[9] as HTMLInputElement;

	window.onbeforeunload = function () { return false };

	cancelButton.onclick = function () {
		window.location.href = document.referrer;
	};

	form.addEventListener('submit', registration);

	async function registration(event: Event) {

		window.onbeforeunload = null;
		event.preventDefault();

		if (passwordField.value !== repeatPasswordField.value) {

			repeatPasswordField.style.border = '2px solid #da467d';
			return;
		}

		let userData = {

			about: descriptionField.value,
			first_name: nameField.value.toLowerCase(),
			last_name: lastNameField.value.toLowerCase(),
			patronymic: patronymicField.value.toLowerCase(),
			birth_date: birthDateField.value,
			login: loginField.value,
			password: passwordField.value,

			balance: 100 // это костыль для моки
		};

		let response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(userData)
		});

		if (response.ok) {

			document.cookie = `user=${userData.login}`;
			document.cookie = "SameSite=None";
			window.location.href = `${requests.siteOrigin}user-profile.html`;

		} else if (`${response.status}`[0] === '4') {

			response.status == 409 ? alert('Данный логин занят') : null;

			alert('Ошибка отправки формы!');

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}
	}

}