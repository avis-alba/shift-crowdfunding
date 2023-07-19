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

type RegExpList = {

	userName: string;
	projectName: string;
	login: string;
	password: string;
	youtubeURL: string;
}

type ProjectData = {  // неполный тип ответа

	project_name: string;
	category: string;
	required_amount: string;
	donation_deadline: string;
	video_widget: string;
	description: string;
}

type UserRegistrationData = {

	about: string;
	first_name: string;
	last_name: string;
	patronymic: string;
	birth_date: string;
	login: string;
	password: string;

	balance: number;
}

type LoginData = {

	login: string;
	password: string;
}

type SendProjectData = (event: Event) => Promise<void>;

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