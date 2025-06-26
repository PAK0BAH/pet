import type {ITodoRes} from "../types/interfaces.ts";

export class Todos {

    static async getTodos(page: number = 1, limit: number = 10): Promise<ITodoRes>{
        const res = await fetch(`http://localhost:3001/todos?page=${page}&limit=${limit}`)
        return res.json()
    }

    static async newTodo(text: string){
        await fetch(`http://localhost:3001/todos`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text})
        })
    }

    static async updTodo(id: number, text: string, completed: boolean){
        await fetch(`http://localhost:3001/todos/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text, completed: completed})
        })
    }

    static async deleteTodo(id: number){
        await fetch(`http://localhost:3001/todos/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    }

}