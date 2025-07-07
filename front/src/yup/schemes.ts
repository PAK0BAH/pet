import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
    email: yup.string().trim(),
    password: yup.string(),
});

export const schemaRegister = yup.object().shape({
    email: yup.string().email('Email должен быть корректным').required('ВВедите email').trim(),
    password: yup.string().required('Создайте Пароль').min(6, 'Минимум 6 символов'),
    passwordConfirm: yup.string().required('Обязательное поле'),
    age: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .nullable()
        .notRequired(),
});

export const schemaTodoText = yup.object().shape({
    todoText: yup.string().trim().required(),
});

export const schemaChangePass = yup.object().shape({
    oldPassword: yup.string().required('Введите старый пароль'),
    newPassword: yup.string().required('Введите новый пароль').min(6, 'Минимум 6 символов'),
    confPassword: yup.string().required('Подтвердите новый пароль'),
});
