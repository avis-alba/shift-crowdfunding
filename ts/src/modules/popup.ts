export default function popupHandler(): void {
	let html: HTMLElement = document.documentElement;
	let htmlH: number = html.clientHeight;
	let htmlW: number = html.clientWidth;
	let htmlScrl: number = html.scrollTop;

	document.body.style.overflow = 'hidden';

	let background: HTMLDivElement = document.createElement('div');
	background.classList.add('popup-background');
	document.body.append(background);

	let popup: HTMLDivElement | null = document.body.querySelector('#popup');

	function hidePopup(): void {
		background.remove();
		popup?.setAttribute('style', 'display: none');
		document.body.style.overflow = 'auto';
	}

	if (popup) {
		let popupStyles: CSSStyleDeclaration = getComputedStyle(popup);
		let offsetTop: string = htmlH / 2 - parseInt(popupStyles.height) / 2 + htmlScrl + 'px';
		let offsetLeft: string = htmlW / 2 - parseInt(popupStyles.width) / 2 + 'px';

		popup.style.display = 'block';
		popup.style.top = offsetTop;
		popup.style.left = offsetLeft;

		let closeButton: HTMLButtonElement | null = popup.querySelector('.btn-close');
		if (closeButton) closeButton.addEventListener('click', hidePopup);

		let resetButton: HTMLInputElement | null = popup.querySelector('[type="reset"]');
		if (resetButton) resetButton.addEventListener('click', hidePopup);

		background.addEventListener('click', hidePopup);
	}
}