export default function getFormFields(form: HTMLFormElement): HTMLInputElement[] {

	return [...form.elements] as HTMLInputElement[];
}