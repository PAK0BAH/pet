import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { changePage, fetchData } from '@/store/todoSlice';
import { useEffect } from 'react';
import classNames from 'classnames';

export function Pagination() {
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

    const activeBtnStyle = (index: number) =>
        classNames({
            'text-green-600': store.page === index + 1,
        });

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
        <div className={'flex justify-between  items-center'}>
            <p>Страницы {store.page}</p>
            {Array.from({ length: store.totalPages }, (_, i) => (
                <button className={activeBtnStyle(i)} key={i} onClick={() => handleChangePage(i)}>
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
