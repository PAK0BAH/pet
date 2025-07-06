import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { RegisterForm } from './pages/RegisterForm';
import { LoginForm } from './pages/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProfilePage } from './pages/ProfilePage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

export default function App() {
    const isAuth = useSelector((state: RootState) => state.userData.accessToken);

    return (
        <BrowserRouter>
            {isAuth && (
                <>
                    <Link to="/">home</Link>
                    <Link to="/profile">profile</Link>
                </>
            )}
            {!isAuth && (
                <>
                    <Link to="/login">login </Link>
                    <Link to="/register">register</Link>
                </>
            )}
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route index element={<HomePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </BrowserRouter>
    );
}
