import { useState } from 'react';
import { Users } from '../api/users';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { setToken } from '../store/authSlice';

export function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [age, setAge] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const HandleRegister = async () => {
        const num = Number(age);
        const ageToNum = isNaN(num) ? null : num;
        try {
            const res = await Users.register(email, password, ageToNum);
            console.log('Register', res);
            dispatch(setToken(res.accessToken));
            localStorage.refreshToken = res.refreshToken;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <input
                className={'border'}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                className={'border'}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <input
                className={'border'}
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
            />
            <input
                className={'border'}
                value={age}
                onChange={(event) => setAge(event.target.value)}
            />
            <button className={'border'} onClick={HandleRegister}>
                Register
            </button>
        </>
    );
}
