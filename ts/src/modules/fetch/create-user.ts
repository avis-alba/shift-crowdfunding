import * as REQUESTS from './requests';
import getFormFields from '../get-formfields';
import handleFetchError from './error-handler';

export default async function createUser(): Promise<void> {

	if (location.href !== `${REQUESTS.SITE_ORIGIN}create-user.html`) return;

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.REGISTRATION}`;

	const form: HTMLFormElement = document.querySelector('#create-user') as HTMLFormElement;
	const [lastNameField, nameField, patronymicField, birthDateField, loginField, passwordField, repeatPasswordField, descriptionField, submitButton, cancelButton] = getFormFields(form);

	window.onbeforeunload = function (): boolean { return false };

	cancelButton.onclick = function (): void {
		location.href = document.referrer;
	};

	form.addEventListener('submit', registration);

	async function registration(event: Event): Promise<void> {

		window.onbeforeunload = null;
		event.preventDefault();

		if (passwordField.value !== repeatPasswordField.value) {

			repeatPasswordField.style.border = '2px solid #da467d';
			return;
		}

		const userData: UserRegistrationData = {

			about: descriptionField.value,
			first_name: nameField.value.toLowerCase(),
			last_name: lastNameField.value.toLowerCase(),
			patronymic: patronymicField.value.toLowerCase(),
			birth_date: birthDateField.value,
			login: loginField.value,
			password: passwordField.value,

			balance: 100 // это костыль для моки
		};

		try {
			const response: Response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(userData)
			});

			if (response.ok) {

				document.cookie = `login=${userData.login}`;
				location.href = `${REQUESTS.SITE_ORIGIN}user-profile.html`;

			} else {

				handleFetchError(response.status, 'user');

			}
		} catch (e) {

			if (e instanceof Error) {

				alert(`Ошибка при создании профиля: ${e.message}`);
			}
		}
	}
}