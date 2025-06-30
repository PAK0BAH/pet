import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';

export default function Status() {
    const store = useSelector((state: RootState) => state.data);

    const severity = store.status === 'Ошибка' ? 'error' : 'success';

    return (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity}>
            {store.status}
        </Alert>
    );
}
