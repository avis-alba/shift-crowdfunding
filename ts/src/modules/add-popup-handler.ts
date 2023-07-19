import popupHandler from './popup';
import login from './fetch/login';

export default function addPopupHandler(): void {

	const loginButtons: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('#login-button');

	for (let button of loginButtons) {
		button.onclick = popupHandler;
	}

	const loginForm: HTMLFormElement = document.querySelector('#popup-form') as HTMLFormElement;
	loginForm.addEventListener('submit', login);
}
