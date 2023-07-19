import getCookies from './get-cookies.js';

export const REQUEST_ORIGIN: string = `http://localhost:3000/`;
export const SITE_ORIGIN: string = `http://127.0.0.1:5500/html/`;

export const LOGIN: string | undefined = getCookies()?.login;

const idParameter: RegExpMatchArray | null = location.search.match(/id=.+/);
export const PROJECT_ID: string | undefined = idParameter ? idParameter[0].slice(3) : undefined;

export const URLS: RequestUrls = {

	POST: {
		REGISTRATION: `users`,
		LOGIN: `login`,
		BALANCE: `balance`,
		CREATE_PROJECT: `projects`,
		DONATE_TO_PROJECT: `projects/${PROJECT_ID}/donate`
	},
	GET: {
		USER_INFO: `users/${LOGIN}`,
		USER_PROJECTS: `users/${LOGIN}/projects`,
		PROJECTS: `projects`,
		PROJECT_BY_ID: `projects/${PROJECT_ID}`,
	},
	PUT: {
		EDIT_USER: `users/${LOGIN}`,
		EDIT_PROJECT: `projects/${PROJECT_ID}`,
		CHANGE_PASSWORD: `users/${LOGIN}/security`,
	},
	DELETE: {
		DELETE_PROJECT: `projects/${PROJECT_ID}`,
		CANCEL_FUNDRISING: `projects/${PROJECT_ID}/cancel-fundraising`
	}
}