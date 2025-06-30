import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todos } from '@/api/todos';
import { fetchData } from '@/store/todoSlice';
import type { AppDispatch } from '@/store/store';
import type { ITodoItem } from '@/types/interfaces';
import classNames from 'classnames';

export function TodoItem({ id, text, completed }: ITodoItem) {
    const [textTodo, setTextTodo] = useState(text);
    const [editButton, setEditButton] = useState(false);
    const [completedTodo, setCompletedTodo] = useState(completed);
    const dispatch = useDispatch<AppDispatch>();

    const editBtnStyle = classNames({
        border: editButton,
    });

    const handleEditTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editButton) {
            (async () => {
                await Todos.updTodo(id, textTodo, completed);
                dispatch(fetchData());
            })();
        }
        setEditButton((prev) => !prev);
    };

    const handleChangeCompleted = async () => {
        const newCompleted = !completedTodo;
        setCompletedTodo(newCompleted);
        await Todos.updTodo(id, textTodo, newCompleted);
        dispatch(fetchData());
    };

    const handleDeleteTodo = async () => {
        await Todos.deleteTodo(id);
        dispatch(fetchData());
    };

    return (
        <div className={'flex'}>
            <form onSubmit={handleEditTitle}>
                <button>{editButton ? '✔' : '✐'}</button>
                <input
                    className={editBtnStyle}
                    value={textTodo}
                    onChange={(e) => setTextTodo(e.target.value)}
                    disabled={!editButton}
                />
            </form>
            <input type={'checkbox'} checked={completedTodo} onChange={handleChangeCompleted} />
            <button onClick={handleDeleteTodo}>✖️</button>
        </div>
    );
}
