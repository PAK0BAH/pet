import '../App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todos } from '@/api/todos';
import { changePage, fetchData } from '@/store/todoSlice';
import { type AppDispatch, type RootState } from '@/store/store';
import type { ITodoItem } from '@/types/interfaces';
import { Box, Button, Stack, TextField } from '@mui/material';
import { TodoItem, Pagination, Limit, Status } from '@/components/';
import AddIcon from '@mui/icons-material/Add';
import { setToken } from '../store/authSlice';
import { Users } from '../api/users';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaTodoText } from '../yup/schemes';

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const store = useSelector((state: RootState) => state.data);
    const assetsToken = useSelector((state: RootState) => state.userData.accessToken);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaTodoText) });

    const handleNewTodo = async (data: { todoText: string }) => {
        const res = await Todos.newTodo(assetsToken!, data.todoText);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            dispatch(setToken(tokens.accessToken));
            await Todos.newTodo(tokens.accessToken, data.todoText);
        }
        reset();
        dispatch(changePage(1));
        dispatch(fetchData());
    };

    useEffect(() => {
        dispatch(fetchData());
    }, [assetsToken, dispatch]);

    return (
        <>
            <Box className={'flex justify-center'}>
                <Box className={'w-[400px]'}>
                    <Status />
                    <Limit />
                    <Box
                        component="form"
                        className={'mt-5 ml-10 mb-5 mr-2 flex justify-center space-x-3'}
                        onSubmit={handleSubmit(handleNewTodo)}
                    >
                        <TextField
                            sx={{ width: 500 }}
                            label="Новая задача"
                            variant="standard"
                            {...register('todoText')}
                        />
                        <Button
                            disabled={!!errors.todoText}
                            type="submit"
                            variant="outlined"
                            sx={{
                                width: 30,
                                height: 30,
                                minWidth: '30px',
                                m: 1,
                                ml: 3,
                                color: 'black',
                                border: 'none',
                            }}
                        >
                            <AddIcon></AddIcon>
                        </Button>
                    </Box>
                    <Stack spacing={1}>
                        {store.todos?.map((task: ITodoItem) => (
                            <TodoItem key={task.id} {...task} />
                        ))}
                    </Stack>
                    <Pagination />
                </Box>
            </Box>
        </>
    );
}
