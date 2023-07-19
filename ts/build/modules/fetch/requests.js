var _a;
import getCookies from './get-cookies.js';
export const REQUEST_ORIGIN = `http://localhost:3000/`;
export const SITE_ORIGIN = `http://127.0.0.1:5500/html/`;
export const LOGIN = (_a = getCookies()) === null || _a === void 0 ? void 0 : _a.login;
const idParameter = location.search.match(/id=.+/);
export const PROJECT_ID = idParameter ? idParameter[0].slice(3) : undefined;
export const URLS = {
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
};
