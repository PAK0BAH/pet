import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { changePage, fetchData } from '@/store/todoSlice';
import { useEffect } from 'react';
import classNames from 'classnames';
import { Button, Container } from '@mui/material';

export default function Pagination() {
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

    const activeBtnStyle = (index: number) =>
        classNames({
            green: store.page === index + 1,
            black: store.page !== index + 1,
        });

    const itemsStyle = classNames(store.totalPages > 1 ? 'justify-between' : 'justify-center');

    const handleChangePage = (page: number) => {
        dispatch(changePage(page + 1));
        dispatch(fetchData());
    };

    useEffect(() => {
        if (store.todos.length === 0 && store.page > 1) {
            dispatch(changePage(store.page - 1));
            dispatch(fetchData());
        }
    }, [store.todos]);

    return (
        <Container className={`flex ${itemsStyle} mt-10`}>
            {Array.from({ length: store.totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant="outlined"
                    sx={{
                        width: 30,
                        height: 30,
                        minWidth: '30px',
                        color: activeBtnStyle(i),
                        borderColor: 'black',
                    }}
                    onClick={() => handleChangePage(i)}
                >
                    {i + 1}
                </Button>
            ))}
        </Container>
    );
}
