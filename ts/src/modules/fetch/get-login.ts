export default function getLoginFromCookie(): string {

	let cookie: string[] = document.cookie.split('; ');

	let cookieLogin: string | undefined = cookie.find((item) => {
		if (item.match(/user=.+/)) return true;
	});

	let login: string = '';

	if (cookieLogin) login = cookieLogin.slice(5);

	return login;
}