// export default function getLoginFromCookie(): string {
// 	let cookie: string[] = document.cookie.split('; ');
// 	let cookieLogin: string | undefined = cookie.find((item) => {
// 		if (item.match(/login=.+/)) return true;
// 	});
// 	let login: string = '';
// 	if (cookieLogin) login = cookieLogin.slice(6);
// 	return login;
// }
export default function getCookies() {
    if (!document.cookie)
        return;
    const COOKIES_ARR = document.cookie.split('; ');
    const COOKIES = {};
    for (let item of COOKIES_ARR) {
        let [property, value] = item.split('=');
        COOKIES[property] = value;
    }
    return COOKIES;
}
