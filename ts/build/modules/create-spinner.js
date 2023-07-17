export default function createSpinner() {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner-border');
    spinner.setAttribute('role', 'status');
    return spinner;
}
export function createBackground() {
    const background = document.createElement('div');
    background.classList.add('spinner-background');
    return background;
}
