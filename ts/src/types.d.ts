const enum ERROR_CODES {

	SERVER_ERROR = 500,

	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409

}

type Cookies = {

	[property: string]: string
}

interface RegExpList {

	userName: string;
	projectName: string;
	login: string;
	password: string;
	youtubeURL: string;
}

interface ProjectDataToSend {

	project_name: string;
	category: string;
	required_amount: string;
	donation_deadline: string;
	video_widget: string;
	description: string;
}

interface ProjectDataToGet {

	project_id: string;
	project_name: string;
	author: {
		login: string;
		about: string;
		first_name: string;
		last_name: string;
		patronymic: string;
		birth_date: string;
		user_id: string;
	},
	description: string;
	donation_deadline: string;
	video_widget: string;
	required_amount: string;
	collected_amount: string;
	category: string;
}

interface UserRegistrationData {

	about: string;
	first_name: string;
	last_name: string;
	patronymic: string;
	birth_date: string;
	login: string;
	password: string;

	balance: number;
}

interface LoginData {

	login: string;
	password: string;
}

type asyncSubmitHandler = (event: Event) => Promise<void>;

type RequestUrls = {
	POST: {
		[action: string]: string
	};
	GET: {
		[action: string]: string
	};
	PUT: {
		[action: string]: string
	};
	DELETE: {
		[action: string]: string
	};
}