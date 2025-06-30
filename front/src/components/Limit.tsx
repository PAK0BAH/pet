import { useDispatch, useSelector } from 'react-redux';
import { changeLimit, changePage, fetchData } from '@/store/todoSlice';
import type { AppDispatch, RootState } from '@/store/store';
import classNames from 'classnames';
import { Button } from '@mui/material';
const limits: number[] = [5, 10, 15, 20];

export function Limit() {
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

    const activeBtnStyle = (index: number) =>
        classNames({
            green: store.limit === index,
            // '#6a1b9a': !(store.limit === index),
        });

    const handleLimit = (limit: number) => {
        dispatch(changeLimit(limit));
        dispatch(changePage(1));
        dispatch(fetchData());
    };

    return (
        <div className={'flex justify-between  items-center m-5'}>
            {limits.map((el) => (
                <Button
                    variant="contained"
                    sx={{
                        width: 30,
                        height: 30,
                        minWidth: '30px',
                        bgcolor: activeBtnStyle(el),
                    }}
                    onClick={() => handleLimit(el)}
                >
                    {el}
                </Button>
            ))}
        </div>
    );
}
