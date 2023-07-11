
export default async function pageLoad(event: Event) {
	console.log('load');

	let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.login');
	let cookieLogin = document.cookie.match(/user=.+/);
	let login;

	if (cookieLogin) login = cookieLogin[0].slice(5);

	if (login) {

		console.log('hascookie');
		console.log(login);

		for (let button of buttons) {
			button.innerHTML = '<a href="./user-profile.html">Мой профиль</a>';
			button.onclick = null;
		}
	}
}