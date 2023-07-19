import IMask from '../../../node_modules/imask/esm/index';
import { InputMaskElement } from '../../../node_modules/imask/esm/index';

export default function addPromocodeMask(): void {
	const promocode = document.querySelector('#promocode') as InputMaskElement;
	const maskOptions = {
		mask: '0000-0000-0000'
	};

	if (promocode) {
		IMask(promocode, maskOptions);
	}
}
