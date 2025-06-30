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
import Status from '@/components/Status.tsx';
import { Button, TextField } from '@mui/material';

export default function App() {
    const [newTodoText, setNewTodoText] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);

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
        <div className={'flex justify-center '}>
            <div className={'w-[400px]'}>
                <Status />
                <Limit />
                <form
                    className={'mt-5 ml-10 mb-5 mr-2 flex justify-center space-x-3'}
                    onSubmit={handleNewTodo}
                >
                    <TextField
                        sx={{ width: 500 }}
                        id="standard-basic"
                        label="Новая задача"
                        variant="standard"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            width: 30,
                            height: 30,
                            minWidth: '30px',
                            m: 1,
                            ml: 3,
                        }}
                    >
                        +
                    </Button>
                </form>
                <ul className={'w-full'}>
                    {store.todos.map((task: ITodoItem) => (
                        <li key={task.id}>
                            <TodoItem {...task} />
                        </li>
                    ))}
                </ul>
                <Pagination />
            </div>
        </div>
    );
}
