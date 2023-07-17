//json-server --watch db.json
//json-server db.json --routes routes.json
import getLoginFromCookie from './get-login.js';
export const requestOrigin = `http://localhost:3000/`;
export const siteOrigin = `http://127.0.0.1:5500/html/`;
export let userLogin = getLoginFromCookie();
let idParameter = location.href.match(/id=.+/);
export let projectId = idParameter ? idParameter[0].slice(3) : undefined;
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
};
