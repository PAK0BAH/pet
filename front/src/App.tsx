import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { RegisterForm } from './pages/RegisterForm';
import { LoginForm } from './pages/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Link to="/login">login </Link>
            <Link to="/register">register</Link>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Link to="/"></Link>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/profile" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}
