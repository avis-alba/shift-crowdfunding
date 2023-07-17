export default function showAdditionalForm() {
    const button = document.querySelector('#show-form');
    if (button) {
        button.onclick = function () {
            const additionalForm = button === null || button === void 0 ? void 0 : button.nextElementSibling;
            additionalForm.classList.toggle('form-visible');
        };
    }
}
