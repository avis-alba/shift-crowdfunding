import * as REQUESTS from './requests';
import showAdditionalForm from '../show-form';
import getCookies from './get-cookies';
import createSpinner from '../create-spinner';
import { createBackground } from '../create-spinner';
import { deleteProject } from './edit-project';
import handleFetchError from './error-handler';

export default async function getProjectInfo(): Promise<void> {

	if (!location.href.includes('project-item.html?id=')) return;

	showAdditionalForm();

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECT_BY_ID}`;
	const requestURLDonation: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.DONATE_TO_PROJECT}`;

	const projectName: HTMLElement = document.querySelector('#project-name') as HTMLElement;
	const projectCategory: HTMLElement = document.querySelector('#project-category') as HTMLElement;
	const projectDescription: HTMLElement = document.querySelector('#project-description') as HTMLElement;
	const projectVideo: HTMLElement = document.querySelector('#project-video') as HTMLElement;

	const sidebar: HTMLElement = document.querySelector('#project-sidebar') as HTMLElement;

	const adminMenu: HTMLDivElement = document.querySelector('#project-management') as HTMLDivElement;

	const spinner: HTMLDivElement = createSpinner();
	const spinnerBackground: HTMLDivElement = createBackground();
	spinner.style.top = '250px';
	spinner.style.left = `${document.documentElement.clientWidth / 2 - 18}px`;

	document.body.append(spinnerBackground);
	document.body.append(spinner);

	const response: Response = await fetch(requestURL);

	if (response.ok) {
		const project = await response.json(); // типизировать ответ с бэка

		spinner.remove();
		spinnerBackground.remove();

		const name = project.project_name;
		const category = project.category;
		const description = project.description;
		const video = project.video_widget;
		const collectedAmount = project.collected_amount;
		const requiredAmount = project.required_amount;
		const authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
		const authorName = project.author.first_name[0].toUpperCase();
		const authorPatronymic = project.author.patronymic[0].toUpperCase();

		const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat();
		const deadline: string = formatter.format(new Date(project.donation_deadline));

		projectName.innerHTML = name;
		projectDescription.innerHTML = `<p>${description}</p>`;
		projectCategory.innerHTML = `<p>${category}</p>`;

		if (video) {

			projectVideo.style.display = 'block';

			const iframe: HTMLIFrameElement = document.createElement('iframe');
			projectVideo.append(iframe);
			iframe.outerHTML = `<iframe width="560" height="315" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`

		}

		const sidebarTemplate: string = `
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

		if (getCookies()?.login === project.author.login) {

			adminMenu.style.display = 'block';

			const editButton: HTMLAnchorElement = adminMenu.querySelector('#edit') as HTMLAnchorElement;
			const sendMoneyButton: HTMLButtonElement = adminMenu.querySelector('#withdraw') as HTMLButtonElement;
			const deleteButton: HTMLButtonElement = adminMenu.querySelector('#delete') as HTMLButtonElement;

			editButton.onclick = function (): void {
				location.href = `${REQUESTS.SITE_ORIGIN}edit-project.html?id=${REQUESTS.PROJECT_ID}`;
			}

			if (+collectedAmount >= +requiredAmount) sendMoneyButton.setAttribute('style', '');

			deleteButton.addEventListener('click', deleteProject);

		}

		const donationForm: HTMLFormElement = sidebar.querySelector('#fund') as HTMLFormElement;
		const moneyField: HTMLInputElement = donationForm.elements.namedItem('donation') as HTMLInputElement;
		const money: { amount: string } = {
			amount: moneyField.value
		};

		donationForm.addEventListener('submit', donateToProject);

		async function donateToProject(event: Event): Promise<void> {

			event.preventDefault();

			console.log(money);

			const response: Response = await fetch(`${REQUESTS.REQUEST_ORIGIN}donate`, { // стоит url для моки, рабочий requestURLDonation
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(money)
			});

			if (response.ok) {

				location.reload();

			} else if (response.status === ERROR_CODES.CONFLICT) {

				alert('Недостаточно средств!');
				return;

			} else {

				handleFetchError(response.status, 'project');

			}
		}

	} else {

		handleFetchError(response.status, 'project');

	}
}