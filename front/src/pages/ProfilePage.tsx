import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { Users } from '../api/users';
import { setUser } from '../store/authSlice';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaChangePass } from '../yup/schemes';
import type { IChangePass } from '../types/froms';
import { Alert, Box, Button, Fade, ListItem, TextField, List } from '@mui/material';

export function ProfilePage() {
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);
    const userData = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch<AppDispatch>();
    const [apiError, setApiError] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaChangePass),
    });

    const handleChangePass = async (data: IChangePass) => {
        if (data.oldPassword === data.newPassword) {
            setError('newPassword', { message: 'Пароли совпадают' });
            setError('oldPassword', { message: 'Пароли совпадают' });
            return;
        }
        if (data.newPassword !== data.confPassword) {
            setError('newPassword', { message: 'Пароли не совпадают' });
            setError('confPassword', { message: 'Пароли не совпадают' });
            return;
        }
        const res = await Users.changePassword(accessToken!, data.oldPassword, data.newPassword);
        if (res.error) {
            setApiError('Неверный старый пароль');
            return;
        }
        reset();
    };

    useEffect(() => {
        if (apiError) {
            const timeout = setTimeout(() => setApiError(''), 2000);
            return () => clearTimeout(timeout);
        }
    }, [apiError]);

    useEffect(() => {
        (async () => {
            const res = await Users.getMe(accessToken!);
            dispatch(setUser(res));
        })();
    }, []);

    return (
        <>
            <Box className={'flex justify-center'}>
                <Box className={'w-[400px] flex flex-col gap-4'}>
                    <List>
                        <ListItem>Email - {userData.user?.email}</ListItem>
                        <ListItem>Возраст - {userData.user?.age}</ListItem>
                        <ListItem>
                            Дата создания - {userData.user?.createdAt?.slice(0, 10)}
                        </ListItem>
                    </List>

                    <Box
                        className={"w-[400px] flex flex-col gap-4'"}
                        component="form"
                        onSubmit={handleSubmit(handleChangePass)}
                    >
                        <TextField
                            {...register('oldPassword')}
                            sx={{ height: 90 }}
                            variant="standard"
                            label="Старый пароль"
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword?.message}
                            type="password"
                        />
                        <TextField
                            {...register('newPassword')}
                            sx={{ height: 90 }}
                            variant="standard"
                            label="Новый пароль"
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message}
                            type="password"
                        />
                        <TextField
                            {...register('confPassword')}
                            sx={{ height: 90, pb: 15 }}
                            variant="standard"
                            label="Повторите новый пароль"
                            error={!!errors.confPassword}
                            helperText={errors.confPassword?.message}
                            type="password"
                        />
                        <Button type="submit">перепоменять пароль</Button>
                    </Box>
                    <Fade in={!!apiError}>
                        <Alert severity="error">{apiError}</Alert>
                    </Fade>
                </Box>
            </Box>
        </>
    );
}
