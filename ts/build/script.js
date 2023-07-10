import popupHandler from './modules/popup.js';
import addPromocodeMask from './modules/mask.js';
import addFormFieldLimits from './modules/formfield-limits.js';
let loginButtons = document.body.querySelectorAll('.login');
for (let button of loginButtons) {
    button.onclick = popupHandler;
}
addPromocodeMask();
addFormFieldLimits();
