export default function makeProjectCard(project: ProjectDataToGet, link: string): HTMLElement {

	const projectCard: HTMLAnchorElement = document.createElement('a');
	projectCard.href = link;

	const container: HTMLDivElement = document.createElement('div');
	container.classList.add('projects-item');

	const nameContainer: HTMLDivElement = document.createElement('div');
	nameContainer.classList.add('item-name');

	const bodyContainer: HTMLDivElement = document.createElement('div');
	bodyContainer.classList.add('item-body');

	const name: HTMLHeadingElement = document.createElement('h3');
	name.append(project.project_name);

	const description: HTMLDivElement = document.createElement('div');
	description.classList.add('item-description');
	description.append(project.description);

	const info: HTMLDivElement = document.createElement('div');
	info.classList.add('item-info');

	const infoTemplate: string = `
								<p><strong>Собрано:</strong></p>
								<p id="money">${project.collected_amount} / ${project.required_amount}</p>
								<p><strong>Окончание сбора:</strong></p>
								<p id="time">${project.donation_deadline}</p>
								<p><strong>Автор:</strong></p>
								<p id="author">${project.author.last_name} ${project.author.first_name}.${project.author.patronymic}.</p>
								`;

	info.insertAdjacentHTML('afterbegin', infoTemplate);

	nameContainer.append(name);
	bodyContainer.append(description, info);
	container.append(nameContainer, bodyContainer);
	projectCard.append(container);

	return projectCard;
}