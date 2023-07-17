import getCookies from './get-cookies.js';
import * as requests from './requests.js';

export default async function pageLoad(): Promise<void> {

	const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.login');

	const login: string | undefined = getCookies()?.login;

	if (login) {

		const registrationButton: HTMLAnchorElement | null = document.querySelector('#registration');
		if (registrationButton) registrationButton.href = './user-profile.html';

		for (let button of buttons) {

			button.innerHTML = 'Мой профиль';
			button.onclick = function (): void {
				window.location.href = `${requests.siteOrigin}user-profile.html`;
			};
		}
	}
}