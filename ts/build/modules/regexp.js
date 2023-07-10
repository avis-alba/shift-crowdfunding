export const formFieldsRegExp = {
    userName: /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\-\s]*[A-Za-zА-Яа-яЁё]$/,
    projectName: /^[a-zA-ZА-Яа-яЁё0-9'\-!"#$%&()\*,./:;\?@[\]^_`{|}~+<=>\s]{2,30}$/,
    login: /^[a-zA-Z0-9_\-]{3,30}$/,
    password: /^[a-zA-Z0-9'\-!"#$%&()\*,./:;\?@[\]^_`{|}~+<=>]{6,30}$/
};
/*ФИО ^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\-\s]*[A-Za-zА-Яа-яЁё]$   2-50
Логин ^[a-zA-Z0-9_\-]{3,30}$
Пароль ^[a-zA-Z0-9'\-!"#$%&()\*,./:;\?@[\]^_`{|}~+<=>]{6,30}$
Название проекта ^[a-zA-ZА-Яа-яЁё0-9'\-!"#$%&()\*,./:;\?@[\]^_`{|}~+<=>\s]{2,30}$ сделать trim строки */ 