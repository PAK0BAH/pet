export interface ITodo {
    "id": number,
    "text": string,
    "completed": boolean,
    // "createdAt": string
}

export interface ITodoProps extends ITodo{
    // handleUpd: () => {}
}
