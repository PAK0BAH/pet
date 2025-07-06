import { useEffect, useState } from 'react';
import { Users } from '../api/users';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setToken } from '../store/authSlice';
import { Navigate } from 'react-router-dom';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state);

    const HandleLogin = async () => {
        const res = await Users.login(email, password);
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
            {isAuth && <Navigate to="/" />}
            <button className={'border'} onClick={() => console.log(store.userData.accessToken)}>
                +
            </button>
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
            <button className={'border'} onClick={HandleLogin}>
                login
            </button>
        </>
    );
}
