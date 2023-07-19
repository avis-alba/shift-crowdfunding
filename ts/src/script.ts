import addPopupHandler from './modules/add-popup-handler';
import addFormFieldLimits from './modules/formfield-limits';

import pageLoad from './modules/fetch/page-load';
import getProjects from './modules/fetch/projects';
import getUserProfile from './modules/fetch/user-load';
import getProjectInfo from './modules/fetch/project-load';
import createUser from './modules/fetch/create-user';
import createProject from './modules/fetch/create-project';
import editProject from './modules/fetch/edit-project';

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
