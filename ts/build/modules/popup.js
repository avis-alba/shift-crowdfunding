export default function popupHandler(e) {
    let html = document.documentElement;
    let htmlH = html.clientHeight;
    let htmlW = html.clientWidth;
    let htmlScrl = html.scrollTop;
    document.body.style.overflow = 'hidden';
    let background = document.createElement('div');
    background.classList.add('popup-background');
    document.body.append(background);
    let popup = document.body.querySelector('#popup');
    if (popup) {
        let popupStyles = getComputedStyle(popup);
        let offsetTop = htmlH / 2 - parseInt(popupStyles.height) / 2 + htmlScrl + 'px';
        let offsetLeft = htmlW / 2 - parseInt(popupStyles.width) / 2 + 'px';
        popup.style.display = 'block';
        popup.style.top = offsetTop;
        popup.style.left = offsetLeft;
        let closeButton = popup.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', hidePopup);
        }
        background.addEventListener('click', hidePopup);
    }
    function hidePopup() {
        background.remove();
        popup === null || popup === void 0 ? void 0 : popup.setAttribute('style', 'display: none');
        document.body.style.overflow = 'auto';
    }
}
