import './App.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Todos} from "./api/todos.ts";
import {fetchData} from "./store/todoSlice.ts";
import {TodoItem} from "./components/TodoItem.tsx";
import {Pagination} from "./components/Paginatoin.tsx";
import {Limit} from "./components/Limit.tsx";
import {type AppDispatch, type RootState} from "./store/store.ts";
import type {ITodoItem} from "./types/interfaces.ts";

export default function App() {

    const [newTodoText, setNewTodoText] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.data)

    const handleNewTodo= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await Todos.newTodo(newTodoText)
        setNewTodoText('')
        dispatch(fetchData())
    }

    useEffect(() => {
        dispatch(fetchData())
    }, []);

    return (
        <div>
            <p className={store.errors ? 'bg-red-500' : ''}>
                Cтатус - {store.status}
            </p>
            <form onSubmit={handleNewTodo}>
                <input className={'border'}
                       value={newTodoText}
                       onChange={e => setNewTodoText(e.target.value)}
                />
                <button>Новая задача</button>
            </form>
            <ul>{store.todos.map((t: ITodoItem) => (
                <li key={t.id}>
                    <TodoItem id={t.id}
                              text={t.text}
                              completed={t.completed}
                    />
                </li>
            ))}</ul>
            <Limit/>
            <Pagination/>
        </div>
    )
}
