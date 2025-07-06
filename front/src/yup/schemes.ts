import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().required(),
});

export const schemaRegister = yup.object().shape({
    email: yup.string().trim().required(),
    password: yup.string().required().min(1),
    passwordConfirm: yup.string().required(),
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
    oldPassword: yup.string().required(),
    newPassword: yup.string().required().min(1),
    passwordConfirm: yup.string().required(),
});
