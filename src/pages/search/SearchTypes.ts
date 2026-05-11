import type { IBook, IQuizResponse } from "@/shared/types/types";
import type { ICourse } from "../videoCourses/VideoCoursesTypes";

export interface ISearchData {
  books: IBook[];
  quizes: IQuizResponse[];
  courses: ICourse[];
}

export interface ISearchDataResponse{
    data: ISearchData;
    total: number;
}

