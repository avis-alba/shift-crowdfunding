export default function handleFetchError(responseStatus: ERROR_CODES, typeOfObject: 'user' | 'project') {

	const type: string = typeOfObject === 'user' ? 'Пользователь' : 'Проект';
	const name: string = typeOfObject === 'user' ? 'логином' : 'названием';

	switch (responseStatus) {

		case ERROR_CODES.SERVER_ERROR:

			alert('Ошибка сервера!');
			break;

		case ERROR_CODES.BAD_REQUEST:

			alert('Некорректные данные запроса!');
			break;

		case ERROR_CODES.UNAUTHORIZED:

			alert('Необходима авторизация!');
			break;

		case ERROR_CODES.FORBIDDEN:

			alert('Недостаточно прав для данной операции!');
			break;

		case ERROR_CODES.NOT_FOUND:

			alert(`${type} не найден!`);
			break;

		case ERROR_CODES.CONFLICT:

			alert(`${type} с таким ${name} уже существует!`);
			break;

		default:

			alert('Неизвестная ошибка');
			break;
	}
}