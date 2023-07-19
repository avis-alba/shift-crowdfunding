export default function handleFetchError(responseStatus, typeOfObject) {
    const type = typeOfObject === 'user' ? 'Пользователь' : 'Проект';
    const name = typeOfObject === 'user' ? 'логином' : 'названием';
    switch (responseStatus) {
        case 500 /* ERROR_CODES.SERVER_ERROR */:
            alert('Ошибка сервера!');
            break;
        case 400 /* ERROR_CODES.BAD_REQUEST */:
            alert('Некорректные данные запроса!');
            break;
        case 401 /* ERROR_CODES.UNAUTHORIZED */:
            alert('Необходима авторизация!');
            break;
        case 403 /* ERROR_CODES.FORBIDDEN */:
            alert('Недостаточно прав для данной операции!');
            break;
        case 404 /* ERROR_CODES.NOT_FOUND */:
            alert(`${type} не найден!`);
            break;
        case 409 /* ERROR_CODES.CONFLICT */:
            alert(`${type} с таким ${name} уже существует!`);
            break;
        default:
            alert('Неизвестная ошибка');
            break;
    }
}
