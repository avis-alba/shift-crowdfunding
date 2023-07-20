import * as REQUESTS from './requests';
import handleFetchError from './error-handler';

export default async function deleteProject(): Promise<void> {

	if (!confirm('Вы действительно хотите удалить проект?')) return;

	const requestURL = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.DELETE.DELETE_PROJECT}`;

	try {
		const response: Response = await fetch(requestURL, { method: 'DELETE' });
		location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html` // костыль для моки

		if (response.ok) {

			alert('Проект удален');
			location.href = `${REQUESTS.SITE_ORIGIN}my-projects.html`;

		} else {

			handleFetchError(response.status, 'project');

		}
	} catch (e) {

		if (e instanceof Error) {

			alert(`Ошибка при удалении проекта: ${e.message}`);
		}
	}
}