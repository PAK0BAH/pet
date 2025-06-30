export interface ITodoItem {
    id: number;
    text: string;
    completed: boolean;
    createdAt?: string;
}

export interface ITodoRes {
    data: ITodoItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IState {
    todos: ITodoItem[];
    page: number;
    totalPages: number;
    limit: number;
    status: string;
    errors: string | null;
}
