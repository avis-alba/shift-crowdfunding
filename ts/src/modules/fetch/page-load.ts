import getLoginFromCookie from './get-login.js';
import * as requests from './requests.js';

export default async function pageLoad(event: Event) {

	let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.login');

	let login = getLoginFromCookie();

	if (login) {

		let registrationButton: HTMLAnchorElement | null = document.querySelector('#registration');
		if (registrationButton) registrationButton.href = './user-profile.html';

		for (let button of buttons) {

			button.innerHTML = 'Мой профиль';
			button.onclick = function () {
				window.location.href = `${requests.siteOrigin}user-profile.html`;
			};
		}
	}
}