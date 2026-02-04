import type { ISearchData } from "./SearchTypes"

export function isDataEmpty(data: ISearchData){
    if(data.books.length) return false;
    if(data.quizes.length) return false;
    if(data.courses.length) return false;
    return true;
}