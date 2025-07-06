import type { IStateUser } from '../types/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Users } from '../api/users';

const initialState: IStateUser = {
    user: null,
    accessToken: null,
    status: 'idle',
};

export const refresh = createAsyncThunk('userData/refresh', async () => {
    const res = await Users.refresh(localStorage.refreshToken);
    console.log('refresh', res);
    if (res.error) {
        throw new Error();
    }
    // } else {
    //     localStorage.isAuth = false;
    // }
    return res;
});

const authSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refresh.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.status = 'idle';
                state.accessToken = action.payload.accessToken;
                localStorage.refreshToken = action.payload.refreshToken;
            })
            .addCase(refresh.rejected, (state) => {
                state.status = `failed`;
                localStorage.removeItem('refreshToken');
            });
    },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
