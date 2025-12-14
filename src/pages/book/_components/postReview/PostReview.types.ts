import type { IReview } from "../../Book.types";

export interface Props{
    bookId: number,
    reviews: IReview[]
}