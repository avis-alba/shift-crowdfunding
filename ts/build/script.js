import popupHandler from './modules/popup.js';
import IMask from '../../node_modules/imask/esm/index.js';
let loginButtons = document.body.querySelectorAll('.login');
for (let button of loginButtons) {
    button.onclick = popupHandler;
}
let promocode = document.querySelector('#promocode');
const maskOptions = {
    mask: '0000-0000-0000'
};
let mask = IMask(promocode, maskOptions);
