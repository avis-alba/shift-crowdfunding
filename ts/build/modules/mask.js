import IMask from '../../../node_modules/imask/esm/index.js';
export default function addPromocodeMask() {
    let promocode = document.querySelector('#promocode');
    const maskOptions = {
        mask: '0000-0000-0000'
    };
    if (promocode) {
        IMask(promocode, maskOptions);
    }
}
