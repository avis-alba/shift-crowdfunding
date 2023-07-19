export default function showAdditionalForm(): void {

	const button: HTMLButtonElement | null = document.querySelector('#show-form');

	if (button) {
		button.onclick = function (): void {
			const additionalForm: HTMLFormElement = button?.nextElementSibling as HTMLFormElement;
			additionalForm.classList.toggle('form-visible');
		}
	}
}