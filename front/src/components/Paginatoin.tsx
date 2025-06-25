import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {changePage, fetchData} from "../store/todoSlice.ts";
import {useEffect} from "react";

export function Pagination(){

    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.data)

    const handleChangePage = (page: number) => {
        dispatch(changePage(page + 1))
        dispatch(fetchData())
    }

    useEffect(() => {
        if (store.todos.length === 0 && store.page > 1) {
            dispatch(changePage(store.page - 1))
            dispatch(fetchData())
        }
    }, [store.todos])

    return (
        <div className={'page |  flex justify-between  items-center'}>
            <p>Страницы</p>
            {Array.from({length: store.totalPages}, (_, i) => (
                <button className={store.page === i+1 ? 'text-green-600 ' : ''}
                        key={i}
                        onClick={() => handleChangePage(i)}>{i + 1}</button>
            ))}
        </div>
    )
}
