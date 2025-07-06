import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { Users } from '../api/users';
import { setUser } from '../store/authSlice';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaChangePass } from '../yup/schemes';
import type { IChangePass } from '../types/froms';

export function ProfilePage() {
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);
    const userData = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schemaChangePass),
    });

    const handleChangePass = async (data: IChangePass) => {
        if (data.oldPassword === data.newPassword) return alert('старый и новый одинаковы');
        if (data.newPassword !== data.passwordConfirm)
            return alert('новый и подтверждение не совпадают');

        await Users.changePassword(accessToken!, data.oldPassword, data.newPassword);
        alert('победа');
        reset();
    };

    useEffect(() => {
        (async () => {
            const res = await Users.getMe(accessToken!);
            dispatch(setUser(res));
            console.log(userData);
        })();
    }, []);

    return (
        <>
            <div>{userData.user?.age}</div>
            <div>{userData.user?.email}</div>
            <div>{userData.user?.createdAt}</div>

            <form onSubmit={handleSubmit(handleChangePass)}>
                <input {...register('oldPassword')} className={'border'} type="password" />
                <input {...register('newPassword')} className={'border'} type="password" />
                <input {...register('passwordConfirm')} className={'border'} type="password" />
                <button>перепоменять пароль</button>
            </form>
        </>
    );
}
