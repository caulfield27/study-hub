import type { IBook } from "../../Library.types";

export interface Props{
    book: IBook;
    onBookOpen: () => void;
}