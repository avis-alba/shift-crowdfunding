export default function showAdditionalForm(): void {
	let button: HTMLButtonElement | null = document.querySelector('#show-form');

	if (button) {
		button.onclick = function (event): void {
			let additionalForm = button?.nextElementSibling as HTMLFormElement;
			additionalForm.style.display = 'block';
		}
	}
}