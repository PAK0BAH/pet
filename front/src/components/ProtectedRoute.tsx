import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { Navigate, Outlet } from 'react-router-dom';
import { logout } from '../store/authSlice';

export function ProtectedRoute() {
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);
    const dispatch = useDispatch<AppDispatch>();

    if (!accessToken && localStorage.refreshToken === 'undefined') {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
    };
    return (
        <>
            {accessToken && <button onClick={handleLogout}>logout</button>}
            {!accessToken && <Navigate to="/" />}
            <Outlet />
        </>
    );
}
