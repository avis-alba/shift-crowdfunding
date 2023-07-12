import popupHandler from './modules/popup.js';
import addPromocodeMask from './modules/mask.js';
import addFormFieldLimits from './modules/formfield-limits.js';
import showAdditionalForm from './modules/show-form.js';
import login from './modules/fetch/login.js';
import pageLoad from './modules/fetch/page-load.js';
import getProjects from './modules/fetch/projects.js';
import getUserProfile from './modules/fetch/user-load.js';

try {
	let loginButtons: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('.login');
	for (let button of loginButtons) {
		button.onclick = popupHandler;
	}

	addPromocodeMask();

	addFormFieldLimits();

	showAdditionalForm();

	let loginForm = document.querySelector('#popup-form') as HTMLFormElement;
	loginForm.addEventListener('submit', login);

	window.addEventListener('load', pageLoad);
	window.addEventListener('load', getProjects);
	window.addEventListener('load', getUserProfile);

} catch (e) {
	if (e instanceof Error) {
		alert(e.message);
	}
}
