import popupHandler from './modules/popup.js';

import IMask from '../../node_modules/imask/esm/index.js';
import { InputMaskElement } from '../../node_modules/imask/esm/index.js';

let loginButtons: NodeListOf<HTMLButtonElement> = document.body.querySelectorAll('.login');
for (let button of loginButtons) {
	button.onclick = popupHandler;
}

let promocode = document.querySelector('#promocode') as InputMaskElement;
const maskOptions = {
	mask: '0000-0000-0000'
};

IMask(promocode, maskOptions);
