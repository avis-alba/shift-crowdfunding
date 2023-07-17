import { ERROR_CODES } from '../error-codes.js';
export default function handleFetchError(responseStatus, typeOfObject) {
    const type = typeOfObject === 'user' ? 'Пользователь' : 'Проект';
    const name = typeOfObject === 'user' ? 'логином' : 'названием';
    switch (responseStatus) {
        case ERROR_CODES.SERVER_ERROR:
            alert('Ошибка сервера!');
            break;
        case ERROR_CODES.CLIENT_ERROR.BAD_REQUEST:
            alert('Некорректные данные запроса!');
            break;
        case ERROR_CODES.CLIENT_ERROR.UNAUTHORIZED:
            alert('Необходима авторизация!');
            break;
        case ERROR_CODES.CLIENT_ERROR.FORBIDDEN:
            alert('Недостаточно прав для данной операции!');
            break;
        case ERROR_CODES.CLIENT_ERROR.NOT_FOUND:
            alert(`${type} не найден!`);
            break;
        case ERROR_CODES.CLIENT_ERROR.CONFLICT:
            alert(`${type} с таким ${name} уже существует!`);
            break;
        default:
            alert('Неизвестная ошибка');
            break;
    }
}
