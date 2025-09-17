
import { useState, useEffect } from "react";
import storageWrapper from "../utils/storageWrapper";


export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => storageWrapper.get(key, initialValue));


    useEffect(() => {
        storageWrapper.set(key, state);
    }, [key, state]);


    return [state, setState];
}