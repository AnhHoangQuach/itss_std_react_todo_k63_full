import { useState, useEffect } from "react";
import { getAllTodos, deleteAllTodos } from "../lib/firebase";


const useFirebaseContainer = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const setUpTodos = async () => {
            const data = await getAllTodos();
            setItems(data);
        };

        setUpTodos();
    }, []);

    const putItemsFirebase = items => {
        setItems(items);
    };

    const clearItemsFirebase = async () => {
        const ids = items.map(ele => ele.documentId);
        await deleteAllTodos(ids);        
        setItems([]);
    };

    return [items, putItemsFirebase, clearItemsFirebase];
}

export default useFirebaseContainer;