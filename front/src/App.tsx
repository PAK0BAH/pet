import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { RegisterForm } from './pages/RegisterForm';
import { LoginForm } from './pages/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProfilePage } from './pages/ProfilePage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { NotFoundPage } from './pages/NotFoundPage';
import { Box, Button, ButtonGroup } from '@mui/material';

export default function App() {
    const isAuth = useSelector((state: RootState) => state.userData.accessToken);

    return (
        <BrowserRouter>
            <Box className={'flex justify-center mb-10'}>
                {isAuth && (
                    <>
                        <ButtonGroup>
                            <Link to="/">
                                <Button sx={{ textTransform: 'none' }}>Home</Button>
                            </Link>
                            <Link to="/profile">
                                <Button sx={{ textTransform: 'none' }}>Profile</Button>
                            </Link>
                        </ButtonGroup>
                    </>
                )}
                {!isAuth && (
                    <>
                        <ButtonGroup>
                            <Link to="/login">
                                <Button sx={{ textTransform: 'none' }}>Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button sx={{ textTransform: 'none' }}>Register</Button>
                            </Link>
                        </ButtonGroup>
                    </>
                )}
            </Box>
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route index element={<HomePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
