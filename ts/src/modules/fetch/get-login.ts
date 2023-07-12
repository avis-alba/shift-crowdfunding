export default function getLoginFromCookie(): string {

	let cookie = document.cookie.split('; ');

	let cookieLogin = cookie.find((item) => {
		if (item.match(/user=.+/)) return true;
	});

	let login = '';

	if (cookieLogin) login = cookieLogin.slice(5);

	return login;
}