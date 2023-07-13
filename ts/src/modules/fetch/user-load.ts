import * as requests from './requests.js';

export default async function getUserProfile() {

	if (window.location.href !== `${requests.siteOrigin}user-profile.html`) return;

	let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.userInfo}`;

	let response = await fetch(requestURL);

	let form: HTMLFormElement = document.querySelector('#edit-user') as HTMLFormElement;

	let lastNameField: HTMLInputElement = form.elements[0] as HTMLInputElement;
	let nameField: HTMLInputElement = form.elements[1] as HTMLInputElement;
	let patronymicField: HTMLInputElement = form.elements[2] as HTMLInputElement;
	let birthDateField: HTMLInputElement = form.elements[3] as HTMLInputElement;
	let descriptionField: HTMLInputElement = form.elements[4] as HTMLInputElement;

	let balance: HTMLElement = document.querySelector('#money') as HTMLElement;

	form.addEventListener('submit', updateUserProfile);

	if (response.ok) {

		let user = await response.json();

		lastNameField.value = user.last_name[0].toUpperCase() + user.last_name.slice(1);
		nameField.value = user.first_name[0].toUpperCase() + user.first_name.slice(1);
		patronymicField.value = user.patronymic[0].toUpperCase() + user.patronymic.slice(1);
		birthDateField.value = user.birth_date;
		descriptionField.value = user.about;

		balance.innerHTML = user.balance;

	} else if (`${response.status}`[0] === '4') {

		response.json().then((response) => {

			console.log(response.message);
			alert('Ошибка загрузки');

		}).catch((error) => {

			alert(error.message);

		});

	} else if (`${response.status}`[0] === '5') {

		alert('Ошибка сервера!');
	}

	let inputs = [lastNameField, nameField, patronymicField, birthDateField, descriptionField];

	for (let field of inputs) {
		field.onchange = function () {

			window.onbeforeunload = function () { return false };
		}
	}

	async function updateUserProfile(event: Event) {

		window.onbeforeunload = null;
		event.preventDefault();

		let updatedData = {
			about: descriptionField.value,
			first_name: nameField.value,
			last_name: lastNameField.value,
			patronymic: patronymicField.value,
			birth_date: birthDateField.value,
			balance: balance.innerHTML // это костыль для моки
		};

		let response = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(updatedData)
		});

		if (response.ok) {

			location.reload();

		} else if (`${response.status}`[0] === '4') {

			alert('Ошибка отправки формы');

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}
	}


	let sendMoneyForm: HTMLFormElement = document.querySelector('#send-money') as HTMLFormElement;
	let promocodeField: HTMLInputElement = sendMoneyForm.elements[0] as HTMLInputElement;

	sendMoneyForm.addEventListener('submit', sendPromocode);

	async function sendPromocode(event: Event) {
		event.preventDefault();

		let requestURL = `${requests.requestOrigin}${requests.requestURLs.POST.balance}`;

		let promocode = {
			promo_code: promocodeField.value
		}

		let response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(promocode)
		});

		if (response.ok) {

			let currentBalance = await response.json();
			balance.innerHTML = currentBalance.current_balance || 10000;

			// ответа нет в моках
			/*{
					"current_balance": 0
			} */

		} else if (`${response.status}`[0] === '4') {

			alert('Неверный промокод');

		} else if (`${response.status}`[0] === '5') {

			alert('Ошибка сервера!');
		}
	}
}