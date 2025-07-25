export interface IBook{
    name:string,
    author:string,
    image: string,
    pdf: string,
    rating: number | null,
    released: string,
    description: string,
    id?: number
}

interface IValidation{
    isValid: boolean;
    message: string
}

export interface IPostBookValidation{
    name: IValidation,
    author: IValidation,
    image: IValidation,
    pdf: IValidation,
    rating: IValidation,
    released: IValidation,
    description: IValidation,
    [key: string] : IValidation
}