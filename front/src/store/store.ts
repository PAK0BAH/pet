import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice.ts';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        data: todoReducer,
        userData: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // getDefaultMiddleware().concat(refreshMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
