
export default function popupHandler(e: Event): void {
	let html = document.documentElement;
	let htmlH = html.clientHeight;
	let htmlW = html.clientWidth;
	let htmlScrl = html.scrollTop;

	document.body.style.overflow = 'hidden';

	let background = document.createElement('div');
	background.classList.add('popup-background');
	document.body.append(background);

	let popup: HTMLDivElement | null = document.body.querySelector('#popup');

	if (popup) {
		let popupStyles = getComputedStyle(popup);
		let offsetTop = htmlH / 2 - parseInt(popupStyles.height) / 2 + htmlScrl + 'px';
		let offsetLeft = htmlW / 2 - parseInt(popupStyles.width) / 2 + 'px';

		popup.style.display = 'block';
		popup.style.top = offsetTop;
		popup.style.left = offsetLeft;

		let closeButton = popup.querySelector('.btn-close');
		if (closeButton) closeButton.addEventListener('click', hidePopup);

		let resetButton = popup.querySelector('[type="reset"]');
		if (resetButton) resetButton.addEventListener('click', hidePopup);


		background.addEventListener('click', hidePopup);

	}

	function hidePopup(): void {
		background.remove();
		popup?.setAttribute('style', 'display: none');
		document.body.style.overflow = 'auto';
	}

}