import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todos } from '@/api/todos';
import { fetchData } from '@/store/todoSlice';
import type { AppDispatch } from '@/store/store';
import type { ITodoItem } from '@/types/interfaces';
import classNames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Checkbox, Container } from '@mui/material';
import type { RootState } from '../store/store';
import { Users } from '../api/users';
import { setToken } from '../store/authSlice';

export default function TodoItem({ id, text, completed }: ITodoItem) {
    const [textTodo, setTextTodo] = useState(text);
    const [editButton, setEditButton] = useState(false);
    const [completedTodo, setCompletedTodo] = useState(completed);
    const dispatch = useDispatch<AppDispatch>();
    const accessToken = useSelector((state: RootState) => state.userData.accessToken);

    const editBtnStyle = classNames({
        'border br': editButton,
        'line-through': completedTodo,
    });

    const handleEditTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editButton) {
            (async () => {
                const res = await Todos.updTodo(accessToken!, id, textTodo, completed);
                if (res.error) {
                    const tokens = await Users.refresh(localStorage.refreshToken);
                    localStorage.refreshToken = tokens.refreshToken;
                    dispatch(setToken(tokens.accessToken));
                    await Todos.updTodo(tokens.accessToken, id, textTodo, completed);
                }
                dispatch(fetchData());
            })();
        }
        setEditButton((prev) => !prev);
    };

    const handleChangeCompleted = async () => {
        const newCompleted = !completedTodo;
        setCompletedTodo(newCompleted);
        const res = await Todos.updTodo(accessToken!, id, textTodo, completed);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            dispatch(setToken(tokens.accessToken));
            await Todos.updTodo(tokens.accessToken, id, textTodo, newCompleted);
        }
        dispatch(fetchData());
    };

    const handleDeleteTodo = async () => {
        const res = await Todos.deleteTodo(accessToken!, id);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            dispatch(setToken(tokens.accessToken));
            await Todos.deleteTodo(tokens.accessToken, id);
        }
        dispatch(fetchData());
    };

    return (
        <Container disableGutters className={'flex gap-2'}>
            <Box component="form" className={'flex gap-2 flex-1'} onSubmit={handleEditTitle}>
                <Button
                    type="submit"
                    size="small"
                    sx={{ borderRadius: 99, width: 40, minWidth: 40, height: 40, color: 'black' }}
                >
                    {editButton ? <CheckRoundedIcon /> : <EditIcon />}
                </Button>
                <input
                    className={`focus:outline-none rounded-full flex-1 px-2 ${editBtnStyle}`}
                    value={textTodo}
                    onChange={(e) => setTextTodo(e.target.value)}
                    disabled={!editButton}
                />
            </Box>
            <Checkbox
                checked={completedTodo}
                onChange={handleChangeCompleted}
                sx={{
                    color: 'black',
                    '&.Mui-checked': {
                        color: 'black',
                    },
                }}
            ></Checkbox>
            <Button
                onClick={handleDeleteTodo}
                size="small"
                sx={{ borderRadius: 99, width: 40, minWidth: 40, height: 40, color: 'black' }}
            >
                {<ClearIcon />}
            </Button>
        </Container>
    );
}
