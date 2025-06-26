import {useDispatch, useSelector} from "react-redux";
import {changeLimit, changePage, fetchData} from "../store/todoSlice.ts";
import type {AppDispatch, RootState} from "../store/store.ts";

const limits: number[] = [5, 10, 20]

export function Limit() {

    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.data)

    const handleLimit = (limit: number) => {
        dispatch(changeLimit(limit))
        dispatch(changePage(1))
        dispatch(fetchData())
    }

    return (
        <div className={'limit | flex justify-between  items-center'}>
            <p>Лимит</p>
            {limits.map((el) => (
                <button key={el}
                        className={store.limit === el ? 'text-green-600 ' : ''}
                        onClick={() => handleLimit(el)}
                >{el}</button>
            ))}
        </div>
    )
}