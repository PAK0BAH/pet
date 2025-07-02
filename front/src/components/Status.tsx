import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';

export default function Status() {
    const store = useSelector((state: RootState) => state.data);

    const severity = store.status === 'Ошибка' ? 'error' : 'success';

    return <Alert severity={severity}>{store.status}</Alert>;
}
