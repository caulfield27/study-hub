import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { useSearchParams } from "react-router"
import useSwr from 'swr';
import { SearchError, SearchLoader, SearchNotFound, SearchResult } from "./_components";
import { isDataEmpty } from "./SearchUtils";
import type { ISearchDataResponse } from "./SearchTypes";

function Search(){
    const [searchParams ,_] = useSearchParams();
    const q = searchParams.get('q') ?? "";
    const config = {
        method: 'get',
        url: apiRoutes.search(q)
    };
    const {isLoading, data, error, mutate} = useSwr<ISearchDataResponse>([config, 'public'], api.sendRequest);
    
    if(isLoading) return <SearchLoader query={`Поиск по ${q}`}/>
    
    if(error) return <SearchError refetch={() => mutate()}/>

    if(data && isDataEmpty(data.data)) return <SearchNotFound query={q}/>

    if(data) return <SearchResult data={data.data} total={data.total} query={q}/>

    return null;
};

export default Search;