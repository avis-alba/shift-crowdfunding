import { formFieldsRegExp } from './regexp.js';

export default function addFormFieldLimits(): void {

	let lastname: HTMLInputElement | null = document.querySelector('#lastname');
	let name: HTMLInputElement | null = document.querySelector('#name');
	let patronymic: HTMLInputElement | null = document.querySelector('#patronymic');
	let login: HTMLInputElement | null = document.querySelector('#login');
	let password: HTMLInputElement | null = document.querySelector('#password');
	let projectName: HTMLInputElement | null = document.querySelector('#project-name');
	let popupLogin: HTMLInputElement | null = document.querySelector('#popup-login');
	let popupPassword: HTMLInputElement | null = document.querySelector('#popup-password');
	let youtubeURL: HTMLInputElement | null = document.querySelector('#url');
	let date: HTMLInputElement | null = document.querySelector('#date');
	let minSumm: HTMLInputElement | null = document.querySelector('#min-summ');
	let maxSumm: HTMLInputElement | null = document.querySelector('#max-summ');

	if (lastname) lastname.pattern = formFieldsRegExp.userName;
	if (name) name.pattern = formFieldsRegExp.userName;
	if (patronymic) patronymic.pattern = formFieldsRegExp.userName;
	if (login) login.pattern = formFieldsRegExp.login;
	if (password) password.pattern = formFieldsRegExp.password;
	if (projectName) projectName.pattern = formFieldsRegExp.projectName;
	if (popupLogin) popupLogin.pattern = formFieldsRegExp.login;
	if (popupPassword) popupPassword.pattern = formFieldsRegExp.password;
	if (youtubeURL) youtubeURL.pattern = formFieldsRegExp.youtubeURL;

	let currentDate: Date = new Date();

	let year: string = currentDate.getFullYear().toString();
	let month: string = (currentDate.getMonth() + 1).toString();
	let nextDay: string = (currentDate.getDate() + 1).toString();
	let previousDay: string = (currentDate.getDate() - 1).toString();

	if (month.length === 1) month = '0' + month;
	if (nextDay.length === 1) nextDay = '0' + nextDay;
	if (previousDay.length === 1) previousDay = '0' + previousDay;

	let minDateProject: string = `${year}-${month}-${nextDay}`;
	let maxDateUser: string = `${year}-${month}-${previousDay}`;


	if (date) {
		if (date.parentElement?.matches('#create-project') || date.parentElement?.matches('#edit-project')) {
			date.min = minDateProject;
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