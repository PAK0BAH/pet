import './App.css'
import {useEffect, useState} from "react";
import {Todos} from "./api/todos.ts";
import * as React from "react";
import {TodoItem} from "./components/Todo.tsx";
import {changeLimit, changePage, fetchData} from "./store/todoSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {type AppDispatch, type RootState} from "./store/store.ts";
import {Pagination} from "./components/Paginatoin.tsx";

const limitButtons: number[] = [5, 10, 15]

function App() {
    const [newTodoText, setNewTodoText] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.data)
    const todos = store.todos

    const handleNewTodo= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await Todos.newTodo(newTodoText)
        setNewTodoText('')
        dispatch(fetchData())
    }

    useEffect(() => {
        dispatch(fetchData())
    }, []);

    return (<div>
        <div className={'limit | '}>
            limit = {store.limit}
            {limitButtons.map((el) => (
                <button key={el} onClick={() => {
                    dispatch(changeLimit(el))
                    dispatch(changePage(1))
                    dispatch(fetchData())
                }}>{el}</button>
            ))}
        </div>
        <form onSubmit={handleNewTodo}>
            <input className={'border'}
                   value={newTodoText}
                   onChange={e => setNewTodoText(e.target.value)}
            />
            <button>new</button>
        </form>
        <ul>
            {todos.map((t) => (
                <li key={t.id}>
                    <TodoItem
                        id={t.id}
                        text={t.text}
                        completed={t.completed}
                    />
                </li>
            ))}
        </ul>
        <Pagination/>
    </div>)
}

export default App
