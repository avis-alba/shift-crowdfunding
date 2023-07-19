export default function getCookies() {
    if (!document.cookie)
        return;
    const COOKIES_ARR = document.cookie.split('; ');
    const COOKIES = {};
    for (let item of COOKIES_ARR) {
        const [property, value] = item.split('=');
        COOKIES[property] = value;
    }
    return COOKIES;
}
