export interface IQuestion{
    id:number,
    question: string,
    variants: string[],
    correct:string,
}

export interface IQuiz{
    id:number,
    name:string,
    complexity: number,
    img: string,
    questions: IQuestion[],
    lang: string;
}

export interface User{
    id: number;
    username: string;
    email: string;
}