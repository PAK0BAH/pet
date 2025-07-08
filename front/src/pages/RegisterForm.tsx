import { useEffect, useState } from 'react';
import { Users } from '../api/users';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { setToken } from '../store/authSlice';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegister } from '../yup/schemes';
import type { IRegister } from '../types/froms';
import { Alert, Box, Button, Fade, TextField } from '@mui/material';
import * as React from 'react';

export function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [isAuth, setIsAuth] = useState(false);
    const [apiError, setApiError] = useState('');
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaRegister) });

    const handleRegister = async (data: IRegister) => {
        if (data.password === data.passwordConfirm) {
            const res = await Users.register(data.email, data.password, data.age!);
            if (res.error) return setApiError(res.error);
            dispatch(setToken(res.accessToken));
            localStorage.refreshToken = res.refreshToken;
            setIsAuth(true);
        } else setError('passwordConfirm', { message: 'Пароли должны быть одинаковы' });
    };

    useEffect(() => {
        if (apiError) {
            const timeout = setTimeout(() => setApiError(''), 2000);
            return () => clearTimeout(timeout);
        }
    }, [apiError]);
    return (
        <>
            {isAuth && <Navigate to="/" />}
            <Box className={'flex justify-center'}>
                <Box
                    className={'w-[400px] flex flex-col gap-4'}
                    component="form"
                    onSubmit={handleSubmit(handleRegister)}
                >
                    <TextField
                        {...register('email')}
                        sx={{ height: 90 }}
                        variant="standard"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...register('password')}
                        sx={{ height: 90 }}
                        variant="standard"
                        label="Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        type="password"
                    />
                    <TextField
                        {...register('passwordConfirm')}
                        sx={{ height: 90 }}
                        variant="standard"
                        label="Confirm password"
                        error={!!errors.passwordConfirm}
                        helperText={errors.passwordConfirm?.message}
                        type="password"
                    />
                    <TextField
                        {...register('age')}
                        sx={{ height: 90 }}
                        variant="standard"
                        label="Age"
                        error={!!errors.age}
                        helperText={errors.age?.message}
                    />
                    <Button sx={{ textTransform: 'none' }} type="submit" className={'border'}>
                        Register
                    </Button>
                    <Fade className={'w-[400]'} in={!!apiError}>
                        <Alert severity="error">{apiError}</Alert>
                    </Fade>
                </Box>
            </Box>
        </>
    );
}
