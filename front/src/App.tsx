import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todos } from '@/api/todos';
import { fetchData } from '@/store/todoSlice';
import { TodoItem } from '@/components/TodoItem';
import { Pagination } from '@/components/Paginatoin';
import { Limit } from '@/components/Limit.tsx';
import { type AppDispatch, type RootState } from '@/store/store';
import type { ITodoItem } from '@/types/interfaces';
import classNames from 'classnames';

export default function App() {
    const [newTodoText, setNewTodoText] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

    const errorsStyle = classNames({
        'bg-red-500': store.errors,
    });

    const handleNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await Todos.newTodo(newTodoText);
        setNewTodoText('');
        dispatch(fetchData());
    };

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    return (
        <div>
            <p className={errorsStyle}>Cтатус - {store.status}</p>
            <form onSubmit={handleNewTodo}>
                <input
                    className={'border'}
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                />
                <button>Новая задача</button>
            </form>
            <ul>
                {store.todos.map((task: ITodoItem) => (
                    <li key={task.id}>
                        <TodoItem {...task} />
                    </li>
                ))}
            </ul>
            <Limit />
            <Pagination />
        </div>
    );
}
