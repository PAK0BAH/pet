import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
    email: yup.string().trim(),
    password: yup.string(),
});

export const schemaRegister = yup.object().shape({
    email: yup.string().email('Email должен быть корректным').required('Введите email').trim(),
    password: yup.string().required('Создайте Пароль').min(6, 'Минимум 6 символов'),
    passwordConfirm: yup.string().required('Обязательное поле'),
    age: yup
        .number()
        .nullable()
        .notRequired()
        .typeError('Не число')
        .min(18, '18+')
        .max(89, 'Верю')
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
});

export const schemaTodoText = yup.object().shape({
    todoText: yup.string().trim().required(),
});

export const schemaChangePass = yup.object().shape({
    oldPassword: yup.string().required('Введите старый пароль'),
    newPassword: yup.string().required('Введите новый пароль').min(6, 'Минимум 6 символов'),
    confPassword: yup.string().required('Подтвердите новый пароль'),
});
