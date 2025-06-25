import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type {ITodo} from "../types/interfaces.ts";
import {Todos} from "../api/todos.ts";
import type {RootState} from "./store.ts";

type State = {
    todos: ITodo[],
    page: number,
    totalPages: number,
    limit: number,
    status: any,
    errors: any
}

const initialState: State = {
    todos: [],
    page: 1,
    totalPages: 1,
    limit: 10,
    status: null,
    errors: null
};


export const fetchData = createAsyncThunk(
    'data/fetchData',
    // @ts-ignore
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const res = await Todos.getTodos(state.data.page, state.data.limit)
        const data = await res.json()
        return data
    }
)

const todoSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        changePage(state, action){
            state.page = action.payload
        },
        changeLimit(state, action){
            state.limit = action.payload
        }
        // getTodos(state) {
        //     state.todos
        //     state.user = action.payload;
        //     state.isAuth = true;
        // },
        // logout(state) {
        //     state.user = null;
        //     state.isAuth = false;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'pending'
                // @ts-ignore
                state.todos = action.payload.data
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = 'pending'
            })
    }
});

export const {
    changePage,
    changeLimit,
} = todoSlice.actions;
export default todoSlice.reducer;