import getCookies from './get-cookies.js';
import * as REQUESTS from './requests.js';

export default async function pageLoad(): Promise<void> {

	const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#login-button');

	const login: string | undefined = getCookies()?.login;

	if (login) {

		const registrationButton: HTMLAnchorElement | null = document.querySelector('#registration');
		if (registrationButton) registrationButton.href = './user-profile.html';

		for (let button of buttons) {

			button.innerHTML = 'Мой профиль';
			button.onclick = function (): void {
				location.href = `${REQUESTS.SITE_ORIGIN}user-profile.html`;
			};
		}
	}
}