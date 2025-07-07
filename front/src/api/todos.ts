import { cleanTodos } from './cleanTodos';
import type { ITodoRes } from '../types/interfaces';
import { Users } from './users';
import { setToken } from '../store/authSlice';
import { store } from '../store/store';

export class Todos extends cleanTodos {
    static async getTodos(
        accessToken: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<ITodoRes> {
        const res = await super.getTodos(accessToken, page, limit);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            store.dispatch(setToken(tokens.accessToken));
            return await super.getTodos(tokens.accessToken, page, limit);
        }
        return res;
    }

    static async newTodo(accessToken: string, text: string) {
        const res = await super.newTodo(accessToken, text);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            store.dispatch(setToken(tokens.accessToken));
            return await super.newTodo(tokens.accessToken, text);
        }
        return res;
    }

    static async updTodo(accessToken: string, id: number, text: string, completed: boolean) {
        const res = await super.updTodo(accessToken, id, text, completed);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            store.dispatch(setToken(tokens.accessToken));
            return await super.updTodo(tokens.accessToken, id, text, completed);
        }
        return res;
    }

    static async deleteTodo(accessToken: string, id: number) {
        const res = await super.deleteTodo(accessToken, id);
        if (res.error) {
            const tokens = await Users.refresh(localStorage.refreshToken);
            localStorage.refreshToken = tokens.refreshToken;
            store.dispatch(setToken(tokens.accessToken));
            return await super.deleteTodo(tokens.accessToken, id);
        }
        return res;
    }
}
