import type { IBook, IQuizResponse } from "@/shared/types/types";

export interface ISearchData {
  books: IBook[];
  quizes: IQuizResponse[];
  courses: unknown[];
}

export interface ISearchDataResponse{
    data: ISearchData;
    total: number;
}

