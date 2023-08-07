import * as REQUESTS from './requests';
import showAdditionalForm from '../show-form';
import createIframe from '../create-iframe';
import getCookies from './get-cookies';
import createSpinner from '../create-spinner';
import { createBackground } from '../create-spinner';
import makeDonation from './make-donation';
import deleteProject from './delete-project';
import handleFetchError from './error-handler';

export default async function getProjectInfo(): Promise<void> {

	if (!location.href.includes('project-item.html?id=')) return;

	showAdditionalForm();

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.GET.PROJECT_BY_ID}`;
	const requestURLDonation: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.DONATE_TO_PROJECT}`;

	const projectBody: HTMLElement = document.querySelector('.content') as HTMLElement;

	const projectName: HTMLElement = document.querySelector('#project-name') as HTMLElement;
	const projectCategory: HTMLElement = document.querySelector('#project-category') as HTMLElement;
	const projectDescription: HTMLElement = document.querySelector('#project-description') as HTMLElement;
	const projectVideo: HTMLElement = document.querySelector('#project-video') as HTMLElement;

	const sidebar: HTMLElement = document.querySelector('#project-sidebar') as HTMLElement;

	const adminMenu: HTMLDivElement = document.querySelector('#project-management') as HTMLDivElement;

	const spinner: HTMLDivElement = createSpinner();
	const spinnerBackground: HTMLDivElement = createBackground();
	spinner.style.position = 'absolute';
	spinner.style.top = '150px';
	spinner.style.left = `${document.documentElement.clientWidth / 2 - 18}px`;

	projectBody.append(spinnerBackground);
	projectBody.append(spinner);

	try {
		const response: Response = await fetch(requestURL);

		if (response.ok) {
			const project = await response.json();

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
				projectVideo.append(createIframe(video));
			}

			const projectMoney: HTMLParagraphElement = document.querySelector('#money') as HTMLParagraphElement;
			const projectTime: HTMLParagraphElement = document.querySelector('#time') as HTMLParagraphElement;
			const projectAuthor: HTMLParagraphElement = document.querySelector('#author') as HTMLParagraphElement;

			projectMoney.append(`${collectedAmount} / ${requiredAmount}`);
			projectTime.append(deadline);
			projectAuthor.append(`${authorLastName} ${authorName}.${authorPatronymic}.`);

			if (getCookies()?.login === project.author.login) {

				adminMenu.style.display = 'inline-block';

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

			const donateToProject: asyncSubmitHandler = makeDonation(requestURLDonation, money);
			donationForm.addEventListener('submit', donateToProject);

		} else {

			handleFetchError(response.status, 'project');

		}
	} catch (e) {

		if (e instanceof Error) {

			alert(`Ошибка при загрузке данных проекта: ${e.message}`);
		}
	}
}