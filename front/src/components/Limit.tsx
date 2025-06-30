import { useDispatch, useSelector } from 'react-redux';
import { changeLimit, changePage, fetchData } from '@/store/todoSlice';
import type { AppDispatch, RootState } from '@/store/store';
import classNames from 'classnames';
const limits: number[] = [5, 10, 20];

export function Limit() {
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

    const activeBtnStyle = (index: number) =>
        classNames({
            'text-green-600': store.limit === index,
        });

    const handleLimit = (limit: number) => {
        dispatch(changeLimit(limit));
        dispatch(changePage(1));
        dispatch(fetchData());
    };

    return (
        <div className={'flex justify-between  items-center'}>
            <p>Лимит</p>
            {limits.map((el) => (
                <button key={el} className={activeBtnStyle(el)} onClick={() => handleLimit(el)}>
                    {el}
                </button>
            ))}
        </div>
    );
}
