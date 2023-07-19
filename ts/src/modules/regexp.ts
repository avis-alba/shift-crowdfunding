export const formFieldsRegExp: RegExpList = {

	userName: /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\-\s]*[A-Za-zА-Яа-яЁё]$/.toString().slice(1, -1),
	projectName: /^[a-zA-ZА-Яа-яЁё0-9\-!#$%&()\*,./:;\?@[\]^{|}~+=\s]{2,30}$/.toString().slice(1, -1),
	login: /^[a-zA-Z0-9_\-]{3,30}$/.toString().slice(1, -1),
	password: /^[a-zA-Z0-9\-!#$%&()\*,./:;\?@[\]^_{|}~+=]{6,30}$/.toString().slice(1, -1),
	youtubeURL: /^https:\/\/www.youtube.com\/.+$/.toString().slice(1, -1)

};