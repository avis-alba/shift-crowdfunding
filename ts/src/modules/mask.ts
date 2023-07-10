import IMask from '../../../node_modules/imask/esm/index.js';
import { InputMaskElement } from '../../../node_modules/imask/esm/index.js';

export default function addPromocodeMask(): void {
	let promocode = document.querySelector('#promocode') as InputMaskElement;
	const maskOptions = {
		mask: '0000-0000-0000'
	};

	if (promocode) {
		IMask(promocode, maskOptions);
	}
}
