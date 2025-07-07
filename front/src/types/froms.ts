export interface ILogin {
    email?: string;
    password?: string;
}

export interface IRegister {
    email: string;
    password: string;
    passwordConfirm: string;
    age?: number | null;
}

export interface IChangePass {
    oldPassword: string;
    newPassword: string;
    confPassword: string;
}
