export default function createSpinner(): HTMLDivElement {

	const spinner: HTMLDivElement = document.createElement('div');
	spinner.classList.add('spinner-border');
	spinner.setAttribute('role', 'status');
	return spinner;
}

export function createBackground(): HTMLDivElement {

	const background: HTMLDivElement = document.createElement('div');
	background.classList.add('spinner-background');
	return background;
}