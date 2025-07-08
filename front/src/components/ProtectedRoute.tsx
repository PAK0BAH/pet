import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { Navigate, Outlet } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Box, Button } from '@mui/material';

export function ProtectedRoute() {
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);
    const dispatch = useDispatch<AppDispatch>();

    if (!accessToken && localStorage.refreshToken === 'undefined') {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <Box className={'absolute top-12.5 right-12.5'}>
                {accessToken && (
                    <Button
                        variant="contained"
                        sx={{ textTransform: 'none' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                )}
            </Box>
            <Outlet />
            {!accessToken && <Navigate to="/" />}
        </>
    );
}
