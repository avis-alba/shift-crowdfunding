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

	lastname ? lastname.pattern = formFieldsRegExp.userName.toString().slice(1, -1) : null;
	name ? name.pattern = formFieldsRegExp.userName.toString().slice(1, -1) : null;
	patronymic ? patronymic.pattern = formFieldsRegExp.userName.toString().slice(1, -1) : null;
	login ? login.pattern = formFieldsRegExp.login.toString().slice(1, -1) : null;
	password ? password.pattern = formFieldsRegExp.password.toString().slice(1, -1) : null;
	projectName ? projectName.pattern = formFieldsRegExp.projectName.toString().slice(1, -1) : null;
	popupLogin ? popupLogin.pattern = formFieldsRegExp.login.toString().slice(1, -1) : null;
	popupPassword ? popupPassword.pattern = formFieldsRegExp.password.toString().slice(1, -1) : null;
}