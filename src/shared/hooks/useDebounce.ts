import { useEffect, useState } from "react";

const useDebounce = (value: string, timeout: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setDebouncedValue(value);
        }, timeout);

        return ()=>{
            clearTimeout(timeOut)
        }
    }, [value, timeout])

    return debouncedValue;
}
 
export default useDebounce;