import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { Users } from '../api/users';
import { setUser } from '../store/authSlice';
import * as React from 'react';

export function ProfilePage() {
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);
    const userData = useSelector((state: RootState) => state.userData);
    const dispatch = useDispatch<AppDispatch>();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const handleChangePass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (oldPass === newPass) {
            alert('старый и новый одинаковы');
            setOldPass('');
            setNewPass('');
            setPassConfirm('');
            return;
        }
        if (newPass !== passConfirm) {
            alert('новый и подтверждение не совпадают');
            setOldPass('');
            setNewPass('');
            setPassConfirm('');
            return;
        }
        (async () => {
            await Users.changePassword(accessToken!, oldPass, newPass);
            alert('победа');
            setOldPass('');
            setNewPass('');
            setPassConfirm('');
        })();
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

            <form onSubmit={handleChangePass}>
                <input
                    className={'border'}
                    type="password"
                    value={oldPass}
                    onChange={(event) => setOldPass(event.target.value)}
                />
                <input
                    className={'border'}
                    type="password"
                    value={newPass}
                    onChange={(event) => setNewPass(event.target.value)}
                />
                <input
                    className={'border'}
                    type="password"
                    value={passConfirm}
                    onChange={(event) => setPassConfirm(event.target.value)}
                />
                <button>перепоменять пароль</button>
            </form>
        </>
    );
}
