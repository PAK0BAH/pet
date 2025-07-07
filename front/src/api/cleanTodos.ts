import type { ITodoRes } from '../types/interfaces.ts';

export class cleanTodos {
    static async getTodos(
        accessToken: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<ITodoRes> {
        const res = await fetch(`http://localhost:3001/todos?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.json();
    }

    static async newTodo(accessToken: string, text: string) {
        const res = await fetch(`http://localhost:3001/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ text: text }),
        });
        return res.json();
    }

    static async updTodo(accessToken: string, id: number, text: string, completed: boolean) {
        const res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ text: text, completed: completed }),
        });
        return res.json();
    }

    static async deleteTodo(accessToken: string, id: number) {
        const res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.json();
    }
}
