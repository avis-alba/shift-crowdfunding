import { formFieldsRegExp } from './regexp.js';

export default function addFormFieldLimits(): void {

	const lastname: HTMLInputElement | null = document.querySelector('#lastname');
	const name: HTMLInputElement | null = document.querySelector('#name');
	const patronymic: HTMLInputElement | null = document.querySelector('#patronymic');
	const login: HTMLInputElement | null = document.querySelector('#login');
	const password: HTMLInputElement | null = document.querySelector('#password');
	const projectName: HTMLInputElement | null = document.querySelector('#project-name');
	const popupLogin: HTMLInputElement | null = document.querySelector('#popup-login');
	const popupPassword: HTMLInputElement | null = document.querySelector('#popup-password');
	const youtubeURL: HTMLInputElement | null = document.querySelector('#url');
	const date: HTMLInputElement | null = document.querySelector('#date');
	const minSumm: HTMLInputElement | null = document.querySelector('#min-summ');
	const maxSumm: HTMLInputElement | null = document.querySelector('#max-summ');

	if (lastname) lastname.pattern = formFieldsRegExp.userName;
	if (name) name.pattern = formFieldsRegExp.userName;
	if (patronymic) patronymic.pattern = formFieldsRegExp.userName;
	if (login) login.pattern = formFieldsRegExp.login;
	if (password) password.pattern = formFieldsRegExp.password;
	if (projectName) projectName.pattern = formFieldsRegExp.projectName;
	if (popupLogin) popupLogin.pattern = formFieldsRegExp.login;
	if (popupPassword) popupPassword.pattern = formFieldsRegExp.password;
	if (youtubeURL) youtubeURL.pattern = formFieldsRegExp.youtubeURL;

	const currentDate: Date = new Date();

	const year: string = currentDate.getFullYear().toString();
	const allowedYear: string = (currentDate.getFullYear() - 18).toString();
	let month: string = (currentDate.getMonth() + 1).toString();
	let day: string = currentDate.getDate().toString();
	let nextDay: string = (currentDate.getDate() + 1).toString();

	if (+month < 10) month = '0' + month;
	if (+nextDay < 10) nextDay = '0' + nextDay;
	if (+day < 10) day = '0' + day;

	const minDateProject: string = `${year}-${month}-${nextDay}`;
	const maxDateProject: string = `2100-01-01`;
	const maxDateUser: string = `${allowedYear}-${month}-${day}`;


	if (date) {
		if (date.parentElement?.matches('#create-project') || date.parentElement?.matches('#edit-project')) {
			date.min = minDateProject;
			date.max = maxDateProject;
		}

		if (date.parentElement?.matches('#create-user') || date.parentElement?.matches('#edit-user')) {
			date.max = maxDateUser;
		}
	}

	function setFilterlimits(event: Event) {
		if (minSumm && maxSumm) {
			if (event.target === minSumm) {
				maxSumm.min = (+minSumm.value + 1).toString();
			}
			if (event.target === maxSumm) {
				+minSumm.value > +maxSumm.value ?
					maxSumm.min = (+minSumm.value + 1).toString() :
					minSumm.max = (+maxSumm.value - 1).toString();
			}
		}
	}

	if (minSumm) minSumm.addEventListener('change', setFilterlimits);
	if (maxSumm) maxSumm.addEventListener('change', setFilterlimits);

}