
export default function createSpinner(): HTMLDivElement {

	let spinner = document.createElement('div');
	spinner.classList.add('spinner-border');
	spinner.setAttribute('role', 'status');
	return spinner;
}

export function createBackground(): HTMLDivElement {

	let background = document.createElement('div');
	background.classList.add('spinner-background');
	return background;
}
