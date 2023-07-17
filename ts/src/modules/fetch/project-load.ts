import * as requests from './requests.js';
import showAdditionalForm from '../show-form.js';
import getLoginFromCookie from './get-login.js';
import createSpinner from './create-spinner.js';
import { createBackground } from './create-spinner.js';

export default async function getProjectInfo(): Promise<void> {

	if (!window.location.href.includes('project-item.html?id=')) return;

	showAdditionalForm();

	let requestURL: string = `${requests.requestOrigin}${requests.requestURLs.GET.projectById}`;
	let requestURLDonation: string = `${requests.requestOrigin}${requests.requestURLs.POST.donateToProject}`;

	let adminMenu: HTMLDivElement = document.querySelector('.admin-menu') as HTMLDivElement;

	let projectName: HTMLElement = document.querySelector('h1') as HTMLElement;
	let projectDescription: HTMLElement = document.querySelector('.full-info-text') as HTMLElement;
	let projectVideo: HTMLElement = document.querySelector('.full-info-video') as HTMLElement;
	let projectCategory: HTMLElement = document.querySelector('.category') as HTMLElement;

	let sidebar: HTMLElement = document.querySelector('.full-info-sidebar') as HTMLElement;
	let fullInfoBlock: HTMLElement = document.querySelector('.item-full-info') as HTMLElement;

	let spinner: HTMLDivElement = createSpinner();
	let spinnerBackground: HTMLDivElement = createBackground();
	spinner.style.top = '250px';
	spinner.style.left = `${document.documentElement.clientWidth / 2 - 18}px`;

	document.body.append(spinnerBackground);
	document.body.append(spinner);

	let response: Response = await fetch(requestURL);
	if (response.ok) {
		let project = await response.json(); // типизировать ответ с бэка

		spinner.remove();
		spinnerBackground.remove();

		let name = project.project_name;
		let category = project.category;
		let description = project.description;
		let video = project.video_widget;
		let collectedAmount = project.collected_amount;
		let requiredAmount = project.required_amount;
		let authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
		let authorName = project.author.first_name[0].toUpperCase();
		let authorPatronymic = project.author.patronymic[0].toUpperCase();

		let formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat();
		let deadline: string = formatter.format(new Date(project.donation_deadline));

		if (getLoginFromCookie() === project.author.login) {
			adminMenu.style.display = 'block';
			let editButton: HTMLAnchorElement = adminMenu.querySelector('a') as HTMLAnchorElement;
			let sendMoneyButton: HTMLButtonElement = adminMenu.querySelector('#withdraw') as HTMLButtonElement;
			let deleteButton: HTMLButtonElement = adminMenu.querySelector('#delete') as HTMLButtonElement;

			editButton.href = editButton.href + requests.projectId;

			if (+collectedAmount >= +requiredAmount) sendMoneyButton.setAttribute('style', '');

			deleteButton.addEventListener('click', deleteProject);

			async function deleteProject(): Promise<void> {
				if (!confirm('Вы действительно хотите удалить проект?')) return;

				let response: Response = await fetch(requestURL, { method: 'DELETE' });
				window.location.href = `${requests.siteOrigin}projects.html` // костыль для моки

				if (response.ok) {

					alert('Проект удален');
					window.location.href = `${requests.siteOrigin}my-projects.html`

				} else if (`${response.status}`[0] === '4') {

					// alert('Ошибка запроса!'); удалено для работы моки

				} else if (`${response.status}`[0] === '5') {

					alert('Ошибка сервера!');
				}
			}
		}

		projectName.innerHTML = name;
		projectDescription.innerHTML = `<p>${description}</p>`;
		projectCategory.innerHTML = `<p>${category}</p>`;

		if (video) {

			projectVideo.style.display = 'block';

			let iframe: HTMLIFrameElement = document.createElement('iframe');
			projectVideo.append(iframe);
			iframe.outerHTML = `<iframe width="560" height="315" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`

		}

		let sidebarTemplate: string = `
					<p><strong>Собрано:</strong></p>
					<div class="sidebar-num">
						<p id="money">${collectedAmount} / ${requiredAmount}</p>
					</div>
					<p><strong>Окончание сбора:</strong></p>
					<div class="sidebar-num">
						<p id="time">${deadline}</p>
					</div>
					<p><strong>Автор:</strong></p>
					<p id="author">${authorLastName} ${authorName}.${authorPatronymic}.</p>
				`;

		sidebar.insertAdjacentHTML('afterbegin', sidebarTemplate);

		let donationForm: HTMLFormElement = sidebar.querySelector('#fund') as HTMLFormElement;
		let moneyField: HTMLInputElement = donationForm.elements[0] as HTMLInputElement;
		let money: { amount: string } = {
			amount: moneyField.value
		};

		donationForm.addEventListener('submit', donateToProject);

		async function donateToProject(event: Event): Promise<void> {

			event.preventDefault();

			let response: Response = await fetch(`${requests.requestOrigin}donate`, { // стоит url для моки, рабочий requestURLDonation
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(money)
			});

			if (response.ok) {

				location.reload();

			} else if (`${response.status}`[0] === '4') {

				alert('Ошибка запроса!');

			} else if (`${response.status}`[0] === '5') {

				alert('Ошибка сервера!');
			}
		}



	} else if (`${response.status}`[0] === '4') {

		alert('Ошибка запроса!');

	} else if (`${response.status}`[0] === '5') {

		alert('Ошибка сервера!');
	}


}