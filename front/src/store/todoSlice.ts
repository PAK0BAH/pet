import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todos } from '../api/todos.ts';
import type { RootState } from './store.ts';
import type { IStateTodo, ITodoRes } from '../types/interfaces.ts';
import { Users } from '../api/users';
import { setToken } from './authSlice';

const initialState: IStateTodo = {
    todos: [],
    page: 1,
    totalPages: 1,
    limit: 5,
    status: 'empty',
    errors: null,
};

export const fetchData = createAsyncThunk<ITodoRes, void>('data/fetchData', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const res = await Todos.getTodos(
        state.userData.accessToken!,
        state.data.page,
        state.data.limit,
    );
    if (res.error) {
        const tokens = await Users.refresh(localStorage.refreshToken);
        thunkAPI.dispatch(setToken(tokens.accessToken));
        localStorage.refreshToken = tokens.refreshToken;
        const todos = await Todos.getTodos(tokens.accessToken, state.data.page, state.data.limit);
        if (todos.error) throw new Error(res.error);
        return todos;
    }
    return res;
});

const todoSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        changePage(state, action) {
            state.page = action.payload;
        },
        changeLimit(state, action) {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'Загрузка';
                state.errors = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'Загружно';
                state.todos = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.errors = null;
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = `Ошибка`;
                state.errors = 'null';
                state.todos = [];
            });
    },
});

export const { changePage, changeLimit } = todoSlice.actions;
export default todoSlice.reducer;
