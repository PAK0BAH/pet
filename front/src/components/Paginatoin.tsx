import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {changePage, fetchData} from "../store/todoSlice.ts";

export function Pagination(){
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.data)
    const pages = store.totalPages

    return (
        <div className={'page | '}>
            pages = {pages}
            {Array.from({length: pages}, (_, i) => (
                <button key={i} onClick={() => {
                    dispatch(changePage(i + 1))
                    dispatch(fetchData())
                }}>{i + 1}</button>
            ))}
        </div>
    )
}
