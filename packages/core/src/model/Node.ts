export interface Node{
    num: number,
    previous: {num: number, activity: string, duration: number}[]
    next: {num: number, activity: string, duration: number}[]
}

