import { useSearchParams } from "react-router";


const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return <span>{query}</span>
}

export default Search;