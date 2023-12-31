export default function popupHandler(): void {
	const html: HTMLElement = document.documentElement;
	const htmlH: number = html.clientHeight;
	const htmlW: number = html.clientWidth;

	document.body.style.overflow = 'hidden';

	const background: HTMLDivElement = document.createElement('div');
	background.classList.add('popup-background');
	document.body.append(background);

	setTimeout(() => { background.style.opacity = '1' }, 0);

	const popup: HTMLDivElement | null = document.body.querySelector('#popup');
	const spinner: HTMLDivElement | null = document.body.querySelector('#spinner-login');

	function hidePopup(): void {
		background.remove();
		popup?.setAttribute('style', 'display: none');
		document.body.style.overflow = 'auto';
	}

	if (popup && spinner) {
		const popupStyles: CSSStyleDeclaration = getComputedStyle(popup);
		const offsetTop: string = htmlH / 2 - parseInt(popupStyles.height) / 2 + 'px';
		const offsetLeft: string = htmlW / 2 - parseInt(popupStyles.width) / 2 + 'px';

		popup.style.display = 'block';
		popup.style.top = '0px';
		popup.style.left = offsetLeft;

		setTimeout(() => { popup.style.top = offsetTop; }, 0);

		spinner.style.position = 'absolute';
		spinner.style.top = '164px';
		spinner.style.left = '234px';

		const closeButton: HTMLButtonElement | null = popup.querySelector('.btn-close');
		if (closeButton) closeButton.addEventListener('click', hidePopup);

		const resetButton: HTMLInputElement | null = popup.querySelector('[type="reset"]');
		if (resetButton) resetButton.addEventListener('click', hidePopup);

		background.addEventListener('click', hidePopup);
	}
}