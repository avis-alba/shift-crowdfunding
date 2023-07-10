export default function showAdditionalForm() {
    let button = document.querySelector('#show-form');
    if (button) {
        button.onclick = function (event) {
            let additionalForm = button === null || button === void 0 ? void 0 : button.nextElementSibling;
            additionalForm.style.display = 'block';
        };
    }
}
