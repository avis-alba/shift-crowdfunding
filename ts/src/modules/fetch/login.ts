import * as requests from './requests.js';
import handleFetchError from './error-handler.js';
import { ERROR_CODES } from '../error-codes.js';

export default async function login(event: Event): Promise<void> {
	event.preventDefault();

	let spinner: HTMLDivElement | null = document.querySelector('.spinner-border');
	if (spinner) spinner.setAttribute('style', 'display: block');

	let form: HTMLFormElement = document.querySelector('#popup-form') as HTMLFormElement;

	let loginField: HTMLInputElement = form.elements[0] as HTMLInputElement;
	let passwordField: HTMLInputElement = form.elements[1] as HTMLInputElement;

	let requestURL: string = `${requests.requestOrigin}${requests.requestURLs.POST.login}`;

	let requestData: LoginData = {

		login: loginField.value,
		password: passwordField.value
	};

	let response: Response = await fetch(requestURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(requestData)
	});

	if (spinner) spinner.setAttribute('style', 'display: none');

	if (response.ok) {

		document.cookie = `login=${requestData.login}`;
		location.href = `${requests.siteOrigin}` + `user-profile.html`;

	} else if (response.status === ERROR_CODES.CLIENT_ERROR.BAD_REQUEST) {

		loginField.style.border = '2px solid #da467d';
		passwordField.style.border = '2px solid #da467d';

		alert('Неверный логин или пароль!');

	} else {

		handleFetchError(response.status, 'user');

	}
}