export class Todos {
    static async getTodos(page: number = 1, limit: number = 10){
        return await fetch(`http://localhost:3001/todos?page=${page}&limit=${limit}`)
    }

    static async newTodo(text: string){
        return await fetch(`http://localhost:3001/todos`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text})
        })
    }

    static async updTodo(id: number, text: string, completed: boolean){
        const strId = id.toString() // на всякий случай
        return await fetch(`http://localhost:3001/todos/${strId}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text, completed: completed})
        })
    }

    static async deleteTodo(id: number){
        const strId = id.toString() // на всякий случай
        return await fetch(`http://localhost:3001/todos/${strId}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    }

}