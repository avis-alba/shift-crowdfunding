import * as REQUESTS from './requests.js';
import showAdditionalForm from '../show-form.js';
import addPromocodeMask from '../mask.js';
import getFormFields from '../get-formfields.js';
import handleFetchError from './error-handler.js';

export default async function getUserProfile(): Promise<void> {

	if (location.href !== `${REQUESTS.SITE_ORIGIN}user-profile.html`) return;

	showAdditionalForm();
	addPromocodeMask();

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.USER_INFO}`;
	const requestURLUpdate: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.PUT.EDIT_USER}`;

	const form: HTMLFormElement = document.querySelector('#edit-user') as HTMLFormElement;
	const formFields: HTMLInputElement[] = getFormFields(form);
	const [lastNameField, nameField, patronymicField, birthDateField, descriptionField] = formFields;

	const balance: HTMLElement = document.querySelector('#money') as HTMLElement;

	form.addEventListener('submit', updateUserProfile);

	const response: Response = await fetch(requestURL);

	if (response.ok) {

		const user = await response.json();

		lastNameField.value = user.last_name[0].toUpperCase() + user.last_name.slice(1);
		nameField.value = user.first_name[0].toUpperCase() + user.first_name.slice(1);
		patronymicField.value = user.patronymic[0].toUpperCase() + user.patronymic.slice(1);
		birthDateField.value = user.birth_date;
		descriptionField.value = user.about;

		balance.innerHTML = user.balance;

	} else {

		handleFetchError(response.status, 'user');

	}

	for (let field of formFields) {
		field.onchange = function (): void {

			window.onbeforeunload = function () { return false };
		}
	}

	async function updateUserProfile(event: Event): Promise<void> {

		window.onbeforeunload = null;
		event.preventDefault();

		const updatedData = {

			about: descriptionField.value,
			first_name: nameField.value.toLowerCase(),
			last_name: lastNameField.value.toLowerCase(),
			patronymic: patronymicField.value.toLowerCase(),
			birth_date: birthDateField.value,

			balance: balance.innerHTML // это костыль для моки
		};

		const response: Response = await fetch(requestURLUpdate, {

			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(updatedData)
		});

		if (response.ok) {

			location.reload();

		} else {

			handleFetchError(response.status, 'user');

		}
	}

	const sendMoneyForm: HTMLFormElement = document.querySelector('#send-money') as HTMLFormElement;
	const promocodeField: HTMLInputElement = sendMoneyForm.elements.namedItem('promocode') as HTMLInputElement;

	sendMoneyForm.addEventListener('submit', sendPromocode);

	async function sendPromocode(event: Event): Promise<void> {

		event.preventDefault();

		const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.BALANCE}`;

		const promocode: { promo_code: string } = {
			promo_code: promocodeField.value
		}

		const response: Response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(promocode)
		});

		if (response.ok) {

			const currentBalance = await response.json();
			balance.innerHTML = currentBalance.current_balance || 10000; // ответа нет в моках


		} else {

			handleFetchError(response.status, 'user');

		}
	}
}