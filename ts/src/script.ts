import addPopupHandler from './modules/add-popup-handler.js';
import addFormFieldLimits from './modules/formfield-limits.js';

import pageLoad from './modules/fetch/page-load.js';
import getProjects from './modules/fetch/projects.js';
import getUserProfile from './modules/fetch/user-load.js';
import getProjectInfo from './modules/fetch/project-load.js';
import createUser from './modules/fetch/create-user.js';
import createProject from './modules/fetch/create-project.js';
import editProject from './modules/fetch/edit-project.js';

try {

	addPopupHandler();
	addFormFieldLimits();

	window.addEventListener('load', pageLoad);
	window.addEventListener('load', getProjects);
	window.addEventListener('load', getUserProfile);
	window.addEventListener('load', getProjectInfo);
	window.addEventListener('load', createUser);
	window.addEventListener('load', createProject);
	window.addEventListener('load', editProject);

} catch (e) {

	if (e instanceof Error) {

		alert(e.message);
	}
}
