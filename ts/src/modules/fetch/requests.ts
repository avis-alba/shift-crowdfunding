//json-server --watch db.json
//json-server db.json --routes routes.json

import getLoginFromCookie from './get-login.js';

export let requestOrigin: string = `http://localhost:3000/`;
export let siteOrigin: string = `http://127.0.0.1:5500/html/`;

export let userLogin: string = getLoginFromCookie();

let idParameter = location.href.match(/id=.+/);
export let projectId: string = idParameter ? idParameter[0].slice(3) : ``;

export let requestURLs = {
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
		deleteProject: `projects/${projectId}`,
		finishFundrising: `projects/${projectId}/finish`
	}
}

export type ProjectData = {

	project_name: string;
	category: string;
	required_amount: string;
	donation_deadline: string;
	video_widget: string;
	description: string;
}

