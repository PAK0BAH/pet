import './App.css'
import {useEffect, useState} from "react";
import {Todos} from "./api/todos.ts";
import * as React from "react";

interface ITodo {
    "id": number,
    "text": string,
    "completed": boolean,
    // "createdAt": string
}

interface ITodoProps extends ITodo{
    handleUpd: () => {}
}

function Todo({id, text, completed, handleUpd}: ITodoProps){
    const [textTodo, setTextTodo] = useState(text)
    const [editButton, setEditButton] = useState(false)
    const [completedTodo, setCompletedTodo] = useState(completed)


    const handleEditTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editButton) {
            (async () => {
                await Todos.updTodo(id, textTodo, completed)
            })()
            handleUpd()
        }
        setEditButton(prev => !prev)
    }

    const handleChangeCompeted = async () => {
        const newCompleted = !completedTodo;
        setCompletedTodo(newCompleted);
        await Todos.updTodo(id, textTodo, newCompleted);
        handleUpd()
    }

    const handleDeleteTodo = async () => {
        await Todos.deleteTodo(id)
        handleUpd()
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
               onChange={handleChangeCompeted}
        />
        <button onClick={handleDeleteTodo}>✖️</button>
    </div>)
}


function App() {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [newTodoText, setNewTodoText] = useState('')

    const handleUpd = async () => {
        const res = await Todos.getTodos(1, 10)
        const todos = await res.json()
        setTodos(todos.data)
    }

    const handleNewTodo= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await Todos.newTodo(newTodoText)
        setNewTodoText('')
        handleUpd()
    }

    useEffect(() => {
        handleUpd()
    }, []);

    return (<div>
        <form onSubmit={handleNewTodo}>
            <input className={'border'}
                   value={newTodoText}
                   onChange={e => setNewTodoText(e.target.value)}
            />
            <button>new</button>
        </form>
        <button onClick={handleUpd}>upd</button>
        <ul>
            {todos.map((t) => (
                <li key={t.id}>
                    <Todo id={t.id}
                          text={t.text}
                          completed={t.completed}
                          handleUpd={handleUpd}/>
                </li>
            ))}
        </ul>
    </div>)
}

export default App
