interface IValidation{
    isValid: boolean;
    message: string
}

export interface IPostBookValidation{
    name: IValidation,
    author: IValidation,
    image: IValidation,
    pdf: IValidation,
    description: IValidation,
    [key: string] : IValidation
}