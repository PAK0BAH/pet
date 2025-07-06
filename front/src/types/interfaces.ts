export interface ITodoItem {
    id: number;
    text: string;
    completed: boolean;
    createdAt?: string;
    userId: number;
}

export interface ITodoRes {
    data: ITodoItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    error?: string;
}

export interface IStateTodo {
    todos: ITodoItem[];
    page: number;
    totalPages: number;
    limit: number;
    status: string;
    errors: string | null;
}

export interface IUser {
    id: number;
    email: string;
    age: number;
    createdAt: string;
    error?: string;
}

export interface IStateUser {
    user: {
        id: number;
        email: string;
        age?: number;
        createdAt: string;
    } | null;
    accessToken: string | null;
    status: 'idle' | 'loading' | 'failed';
}
