import { useState } from 'react';
import { Users } from '../api/users';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { setToken } from '../store/authSlice';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegister } from '../yup/schemes';
import type { IRegister } from '../types/froms';

export function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [isAuth, setIsAuth] = useState(false);
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schemaRegister) });

    const handleRegister = async (data: IRegister) => {
        const res = await Users.register(data.email, data.password, data.age!);
        dispatch(setToken(res.accessToken));
        localStorage.refreshToken = res.refreshToken;
        setIsAuth(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleRegister)}>
                <input {...register('email')} className={'border'} type="email" />
                <input {...register('password')} className={'border'} type="password" />
                <input {...register('passwordConfirm')} className={'border'} type="password" />
                <input {...register('age')} className={'border'} />
                <button className={'border'}>register</button>
            </form>
            {isAuth && <Navigate to="/" />}
        </>
    );
}
