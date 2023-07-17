//json-server --watch db.json
//json-server db.json --routes routes.json
var _a;
import getCookies from './get-cookies.js';
export const requestOrigin = `http://localhost:3000/`;
export const siteOrigin = `http://127.0.0.1:5500/html/`;
export let userLogin = (_a = getCookies()) === null || _a === void 0 ? void 0 : _a.login;
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
        deleteProjectById: `projects/${projectId}`,
        finishFundrising: `projects/${projectId}/finish`
    }
};
