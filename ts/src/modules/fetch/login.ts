import * as requests from './requests.js';

export default async function login(event: Event) {
	event.preventDefault();

	let spinner: HTMLDivElement | null = document.querySelector('.spinner-border');
	if (spinner) spinner.setAttribute('style', 'display: block');

	let form: HTMLFormElement = document.querySelector('#popup-form') as HTMLFormElement;

	let loginField: HTMLInputElement = form.elements[0] as HTMLInputElement;
	let passwordField: HTMLInputElement = form.elements[1] as HTMLInputElement;

	let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.login}`;

	let requestData = {
		login: loginField.value,
		password: passwordField.value
	};

	let response = await fetch(requestURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(requestData)
	});

	if (spinner) spinner.setAttribute('style', 'display: none');

	if (response.ok) {

		let json = await response.json();
		document.cookie = `user=${requestData.login}`;
		location.href = `${requests.siteOrigin}` + `user-profile.html`;

	} else if (`${response.status}`[0] === '4') {

		loginField.style.border = '2px solid #da467d';
		passwordField.style.border = '2px solid #da467d';

		response.json().then((response) => {

			console.log(response.message);
			alert('Неверный логин или пароль');

		}).catch((error) => {

			alert(error.message);

		});

	} else if (`${response.status}`[0] === '5') {

		alert('Ошибка сервера!');
	}
}

