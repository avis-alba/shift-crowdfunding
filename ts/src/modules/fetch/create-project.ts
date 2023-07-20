import * as REQUESTS from './requests';
import makeProjectDataRequest from './send-project-data';

export default async function createProject(): Promise<void> {

	if (location.href !== `${REQUESTS.SITE_ORIGIN}create-project.html`) return;

	const requestURL: string = `${REQUESTS.REQUEST_ORIGIN}${REQUESTS.URLS.POST.CREATE_PROJECT}`;

	const form: HTMLFormElement = document.querySelector('#create-project') as HTMLFormElement;
	const cancelButton: HTMLInputElement = form.elements.namedItem('reset') as HTMLInputElement;

	window.onbeforeunload = function (): boolean { return false };

	cancelButton.onclick = function (): void {
		location.href = document.referrer;
	};

	const sendProjectData: asyncSubmitHandler = makeProjectDataRequest(requestURL, 'POST');

	form.addEventListener('submit', sendProjectData);
}