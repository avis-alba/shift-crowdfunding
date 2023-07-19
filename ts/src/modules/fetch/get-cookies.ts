export default function getCookies(): Cookies | undefined {

	if (!document.cookie) return;

	const COOKIES_ARR: string[] = document.cookie.split('; ');

	const COOKIES: Cookies = {};

	for (let item of COOKIES_ARR) {

		const [property, value] = item.split('=');
		COOKIES[property] = value;

	}

	return COOKIES;
}