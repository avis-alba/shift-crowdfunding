import popupHandler from './popup.js';
import login from './fetch/login.js';

export default function addPopupHandler(): void {

	let loginButtons: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('.login');

	for (let button of loginButtons) {
		button.onclick = popupHandler;
	}

	let loginForm: HTMLFormElement = document.querySelector('#popup-form') as HTMLFormElement;
	loginForm.addEventListener('submit', login);
}
