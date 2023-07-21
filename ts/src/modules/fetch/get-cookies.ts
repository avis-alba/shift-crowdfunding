export default function getCookies(): Cookies | undefined {

	if (!document.cookie) return;

	const cookiesArr: string[] = document.cookie.split('; ');

	const cookies: Cookies = {};

	for (let item of cookiesArr) {

		const [property, value] = item.split('=');
		cookies[property] = value;

	}

	return cookies;
}