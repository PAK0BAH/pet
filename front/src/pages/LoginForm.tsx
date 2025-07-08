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
import { Alert, Box, Button, Fade, TextField } from '@mui/material';

export function LoginForm() {
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state);
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schemaLogin) });

    const handleLogin = async (data: ILogin) => {
        const res = await Users.login(data.email!, data.password!);
        if (res.error) setApiError('Неверные данные');
        else {
            dispatch(setToken(res.accessToken));
            localStorage.refreshToken = res.refreshToken;
        }
    };

    useEffect(() => {
        if (apiError) {
            const timeout = setTimeout(() => {
                setApiError('');
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [apiError]);

    return (
        <>
            {store.userData.accessToken && <Navigate to="/" />}
            <Box className={'flex justify-center'}>
                <Box
                    className={'w-[400px] flex flex-col gap-4 '}
                    component="form"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <TextField {...register('email')} variant="standard" label="Email" />
                    <TextField
                        {...register('password')}
                        sx={{ textTransform: 'none' }}
                        variant="standard"
                        label="Password"
                        type="password"
                    />
                    <Button type="submit">Login</Button>
                    <Fade className={'w-[400]'} in={!!apiError}>
                        <Alert severity="error">{apiError}</Alert>
                    </Fade>
                </Box>
            </Box>
        </>
    );
}
