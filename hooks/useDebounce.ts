import { useEffect, useState } from "react";


function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    //milliseconds after rebounce for searching
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 500);

        return() => {
            clearTimeout(timer);
        }
    }, [value, delay]);


    return debouncedValue;
};

export default useDebounce;