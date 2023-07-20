import addPopupHandler from './modules/add-popup-handler';
import addFormFieldLimits from './modules/formfield-limits';
import windowLoader from './modules/window-load';

try {

	addPopupHandler();
	addFormFieldLimits();
	windowLoader();

} catch (e) {

	if (e instanceof Error) {

		alert(`Ошибка: ${e.message}`);
	}
}
