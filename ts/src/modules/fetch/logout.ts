import * as REQUESTS from './requests';

export default function logOut() {

	document.cookie = "login=";
	location.href = `${REQUESTS.SITE_ORIGIN}index.html`;
}