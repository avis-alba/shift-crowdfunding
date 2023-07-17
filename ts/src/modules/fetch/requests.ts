//json-server --watch db.json
//json-server db.json --routes routes.json

import getCookies from './get-cookies.js';

export const requestOrigin: string = `http://localhost:3000/`;
export const siteOrigin: string = `http://127.0.0.1:5500/html/`;

export let userLogin: string | undefined = getCookies()?.login;

let idParameter: RegExpMatchArray | null = location.href.match(/id=.+/);
export let projectId: string | undefined = idParameter ? idParameter[0].slice(3) : undefined;

export let requestURLs = {  // типизировать
	POST: {
		registration: `users`,
		login: `login`,
		balance: `balance`,
		createProgect: `projects`,
		donateToProject: `projects/${projectId}/donate`
	},
	GET: {
		userInfo: `users/${userLogin}`,
		userProjects: `users/${userLogin}/projects`,
		projects: `projects`,
		projectById: `projects/${projectId}`,
	},
	PUT: {
		editUser: `users/${userLogin}`,
		editProject: `projects/${projectId}`,
		changePassword: `users/security`,
	},
	DELETE: {
		deleteProjectById: `projects/${projectId}`,
		finishFundrising: `projects/${projectId}/finish`
	}
}