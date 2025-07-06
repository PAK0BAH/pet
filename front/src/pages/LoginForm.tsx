import { useEffect, useState } from 'react';
import { Users } from '../api/users';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setToken } from '../store/authSlice';
import { Navigate } from 'react-router-dom';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ILogin } from '../types/froms';
import { schemaLogin } from '../yup/schemes';

export function LoginForm() {
    const [isAuth, setIsAuth] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state);
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schemaLogin) });

    const handleLogin = async (data: ILogin) => {
        const res = await Users.login(data.email, data.password);
        dispatch(setToken(res.accessToken));
        localStorage.refreshToken = res.refreshToken;
    };

    useEffect(() => {
        if (typeof store.userData.accessToken === typeof '') {
            setIsAuth(true);
        }
    }, [store]);

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                {isAuth && <Navigate to="/" />}
                <button
                    className={'border'}
                    onClick={() => console.log(store.userData.accessToken)}
                >
                    +
                </button>
                <input {...register('email')} className={'border'} />
                <input {...register('password')} className={'border'} type="password" />
                <button className={'border'}>login</button>
            </form>
        </>
    );
}
