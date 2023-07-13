import * as requests from './requests.js';
import createSpinner from './create-spinner.js';

export default async function getProjects() {
	let projectContainer: HTMLDivElement | null = document.querySelector('.projects-body');

	if (!projectContainer) return;

	let errorMessage = document.createElement('p');
	errorMessage.style.color = '#da467d';

	let spinner = createSpinner();
	spinner.style.position = 'static';

	projectContainer.append(spinner);

	let requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.projects}`;

	if (window.location.href == `${requests.siteOrigin}my-projects.html`) {

		requestURL = `${requests.requestOrigin}${requests.requestURLs.GET.userProjects}`;

	}

	let response = await fetch(`${requestURL}`);

	spinner.setAttribute('style', 'display: none');

	if (response.ok) {

		let projects = await response.json();
		spinner.style.display = 'none';

		for (let project of projects) {

			let projectName = project.project_name;
			let authorLastName = project.author.last_name[0].toUpperCase() + project.author.last_name.slice(1);
			let authorName = project.author.first_name[0].toUpperCase();
			let authorPatronymic = project.author.patronymic[0].toUpperCase();
			let description = project.description;
			let collectedAmount = project.collected_amount;
			let requiredAmount = project.required_amount;

			let formatter = new Intl.DateTimeFormat();
			let deadline = formatter.format(new Date(project.donation_deadline));


			let projectTemplate = `
							<div class="projects-item">
								<div class="item-name">
									<h3>${projectName}</h3>
								</div>
								<div class="item-body">
									<div class="item-description">
										${description}
									</div>
									<div class="item-info">
										<p><strong>Собрано:</strong></p>
										<p id="money">${collectedAmount} / ${requiredAmount}</p>
										<p><strong>Окончание сбора:</strong></p>
										<p id="time">${deadline}</p>
										<p><strong>Автор:</strong></p>
										<p id="author">${authorLastName} ${authorName}.${authorPatronymic}.</p>
									</div>
								</div>
							</div>
								`;
			let projectCard = document.createElement('a');
			projectCard.href = `${requests.siteOrigin}project-item.html?id=${project.project_id}`;
			projectCard.innerHTML = projectTemplate;
			projectContainer.append(projectCard);
		}

	} else if (`${response.status}`[0] === '4') {

		response.json().then((response) => {

			errorMessage.innerHTML = 'Ошибка запроса';
			projectContainer?.append(errorMessage);

		}).catch((error) => {

			alert(error.message);
		})

	} else if (`${response.status}`[0] === '5') {

		alert('Ошибка сервера!');
	}

}

