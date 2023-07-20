import * as REQUESTS from './requests';
import getFormFields from '../get-formfields';
import handleFetchError from './error-handler';

export default function makeProjectDataRequest(requestURL: string, method: string): asyncSubmitHandler {

	return async function (event: Event): Promise<void> {

		window.onbeforeunload = null;
		event.preventDefault();

		const form: HTMLFormElement = document.querySelector('.main-form') as HTMLFormElement;
		const [nameField, categoryField, moneyField, dateField, videoField, descriptionField] = getFormFields(form);

		const projectData: ProjectDataToSend = {

			project_name: nameField.value.trim(),
			category: categoryField.value,
			required_amount: moneyField.value,
			donation_deadline: dateField.value,
			video_widget: videoField.value,
			description: descriptionField.value

		};

		try {
			const response: Response = await fetch(requestURL, {
				method,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(projectData)
			});

			if (response.ok) {

				if (location.href.includes('edit-project.html?id=')) {
					location.href = `${REQUESTS.SITE_ORIGIN}project-item.html?id=${REQUESTS.PROJECT_ID}`;

				} else if (location.href === `${REQUESTS.SITE_ORIGIN}create-project.html`) {
					location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`;
				}

			} else {

				handleFetchError(response.status, 'project');

			}
		} catch (e) {

			if (e instanceof Error) {

				alert(`Ошибка при отправке данных проекта: ${e.message}`);
			}
		}
	}
}