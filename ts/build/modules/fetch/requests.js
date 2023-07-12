//json-server --watch db.json
import getLoginFromCookie from './get-login.js';
export let requestOrigin = `http://localhost:3000/`;
export let siteOrigin = `http://127.0.0.1:5500/html/`;
export let userLogin = getLoginFromCookie();
export let projectId = ``;
export let projectName = ``;
export let isAscending = ``;
export let minAmount = ``;
export let maxAmount = ``;
export let requestURLs = {
    POST: {
        registration: `users`,
        login: `login`,
        balance: `balance`,
        createProgect: `projects`,
        donateToProject: `/projects/${projectId}/donate`
    },
    GET: {
        userInfo: `users/${userLogin}`,
        userProjects: `users/${userLogin}/projects`,
        projects: `projects`,
        projectByName: `projects?project_name=${projectName}`,
        projectById: `projects/${projectId}`,
        sortByMoney: `projects?sorting_enabled=true&is_ascending=${isAscending}&mode=by_required_amount`,
        sortByDeadline: `projects?sorting_enabled=true&is_ascending=${isAscending}&mode=by_deadline_date`,
        filterByMoney: `projects?filter_required_amount=true&min_amount=${minAmount}&max_amount=${maxAmount}`
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
