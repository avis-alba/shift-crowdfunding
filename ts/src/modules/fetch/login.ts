import * as REQUESTS from './requests';
import getFormFields from '../get-formfields';
import handleFetchError from './error-handler';

export default async function login(event: Event): Promise<void> {
	event.preventDefault();

	const spinner: HTMLDivElement | null = document.querySelector('#spinner-login');
	if (spinner) spinner.setAttribute('style', 'display: block');

	const form: HTMLFormElement = document.querySelector('#popup-form') as HTMLFormElement;
	const [loginField, passwordField] = getFormFields(form);

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.LOGIN}`;

	const requestData: LoginData = {

		login: loginField.value,
		password: passwordField.value
	};

	try {
		const response: Response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(requestData)
		});

		if (spinner) spinner.setAttribute('style', 'display: none');

		if (response.ok) {

			document.cookie = `login=${requestData.login}`;
			location.href = `${REQUESTS.SITE_ORIGIN}` + `user-profile.html`;

		} else if (response.status === ERROR_CODES.BAD_REQUEST) {

			loginField.style.border = '2px solid #da467d';
			passwordField.style.border = '2px solid #da467d';

			alert('Неверный логин или пароль!');
			return;

		} else {

			handleFetchError(response.status, 'user');

		}
	} catch (e) {

		if (e instanceof Error) {

			alert(`Ошибка при входе в личный кабинет: ${e.message}`);
		}
	}
}