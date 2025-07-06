import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);

    if (!accessToken && localStorage.refreshToken === 'undefined') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
