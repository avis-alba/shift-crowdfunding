import pageLoad from './fetch/page-load';
import getProjects from './fetch/projects';
import getUserProfile from './fetch/user-load';
import getProjectInfo from './fetch/project-load';
import createUser from './fetch/create-user';
import createProject from './fetch/create-project';
import editProject from './fetch/edit-project';

export default function windowLoader() {

	window.addEventListener('load', pageLoad);
	window.addEventListener('load', getProjects);
	window.addEventListener('load', getUserProfile);
	window.addEventListener('load', getProjectInfo);
	window.addEventListener('load', createUser);
	window.addEventListener('load', createProject);
	window.addEventListener('load', editProject);
}