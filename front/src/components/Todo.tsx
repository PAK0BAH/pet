import type {ITodoProps} from "../types/interfaces.ts";
import {useState} from "react";
import * as React from "react";
import {Todos} from "../api/todos.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import {fetchData} from "../store/todoSlice.ts";

export function TodoItem({id, text, completed}: ITodoProps){
    const [textTodo, setTextTodo] = useState(text)
    const [editButton, setEditButton] = useState(false)
    const [completedTodo, setCompletedTodo] = useState(completed)
    const dispatch = useDispatch<AppDispatch>()


    const handleEditTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editButton) {
            (async () => {
                await Todos.updTodo(id, textTodo, completed)
            })()
            dispatch(fetchData())
        }
        setEditButton(prev => !prev)
    }

    const handleChangeCompleted = async () => {
        const newCompleted = !completedTodo;
        setCompletedTodo(newCompleted);
        await Todos.updTodo(id, textTodo, newCompleted);
        dispatch(fetchData())
    }

    const handleDeleteTodo = async () => {
        await Todos.deleteTodo(id)
        dispatch(fetchData())
    }

    return(<div className={'Todo | flex'}>
        <form className={'editTitle | '} onSubmit={handleEditTitle}>
            <button>
                {editButton ? '✔' : '✐'}
            </button>
            <input className={editButton ? 'border' : ''}
                   value={textTodo}
                   onChange={e => setTextTodo(e.target.value)}
                   disabled={!editButton}
            />
        </form>
        <input type={'checkbox'}
               checked={completedTodo}
               onChange={handleChangeCompleted}
        />
        <button onClick={handleDeleteTodo}>✖️</button>
    </div>)
}