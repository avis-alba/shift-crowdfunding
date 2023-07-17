export default function popupHandler() {
    const html = document.documentElement;
    const htmlH = html.clientHeight;
    const htmlW = html.clientWidth;
    const htmlScrl = html.scrollTop;
    document.body.style.overflow = 'hidden';
    const background = document.createElement('div');
    background.classList.add('popup-background');
    document.body.append(background);
    const popup = document.body.querySelector('#popup');
    function hidePopup() {
        background.remove();
        popup === null || popup === void 0 ? void 0 : popup.setAttribute('style', 'display: none');
        document.body.style.overflow = 'auto';
    }
    if (popup) {
        const popupStyles = getComputedStyle(popup);
        const offsetTop = htmlH / 2 - parseInt(popupStyles.height) / 2 + htmlScrl + 'px';
        const offsetLeft = htmlW / 2 - parseInt(popupStyles.width) / 2 + 'px';
        popup.style.display = 'block';
        popup.style.top = offsetTop;
        popup.style.left = offsetLeft;
        const closeButton = popup.querySelector('.btn-close');
        if (closeButton)
            closeButton.addEventListener('click', hidePopup);
        const resetButton = popup.querySelector('[type="reset"]');
        if (resetButton)
            resetButton.addEventListener('click', hidePopup);
        background.addEventListener('click', hidePopup);
    }
}
