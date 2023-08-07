import getCookies from './get-cookies';
import * as REQUESTS from './requests';

export default async function pageLoad(): Promise<void> {

	const loginButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#login-button');
	const registrationButton: HTMLButtonElement | null = document.querySelector('#registration');

	if (registrationButton) {
		registrationButton.onclick = function () {
			location.href = `${REQUESTS.SITE_ORIGIN}create-user.html`;
		}
	}

	const login: string | undefined = getCookies()?.login;

	if (login) {

		for (let button of loginButtons) {

			button.innerHTML = 'Мой профиль';
			if (button.parentElement) button.parentElement.style.width = '200px';

			button.onclick = function (): void {
				location.href = `${REQUESTS.SITE_ORIGIN}user-profile.html`;
			};
		}

		if (registrationButton) {

			registrationButton.onclick = function () {
				location.href = `${REQUESTS.SITE_ORIGIN}user-profile.html`;
			}
		}
	}
}