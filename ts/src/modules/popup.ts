export default function popupHandler(): void {
	const html: HTMLElement = document.documentElement;
	const htmlH: number = html.clientHeight;
	const htmlW: number = html.clientWidth;
	const htmlScrl: number = html.scrollTop;

	document.body.style.overflow = 'hidden';

	const background: HTMLDivElement = document.createElement('div');
	background.classList.add('popup-background');
	document.body.append(background);

	const popup: HTMLDivElement | null = document.body.querySelector('#popup');

	function hidePopup(): void {
		background.remove();
		popup?.setAttribute('style', 'display: none');
		document.body.style.overflow = 'auto';
	}

	if (popup) {
		const popupStyles: CSSStyleDeclaration = getComputedStyle(popup);
		const offsetTop: string = htmlH / 2 - parseInt(popupStyles.height) / 2 + htmlScrl + 'px';
		const offsetLeft: string = htmlW / 2 - parseInt(popupStyles.width) / 2 + 'px';

		popup.style.display = 'block';
		popup.style.top = offsetTop;
		popup.style.left = offsetLeft;

		const closeButton: HTMLButtonElement | null = popup.querySelector('.btn-close');
		if (closeButton) closeButton.addEventListener('click', hidePopup);

		const resetButton: HTMLInputElement | null = popup.querySelector('[type="reset"]');
		if (resetButton) resetButton.addEventListener('click', hidePopup);

		background.addEventListener('click', hidePopup);
	}
}