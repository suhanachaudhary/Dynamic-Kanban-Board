
import { useState, useCallback } from "react";


export default function useDragDrop(onMove) {
    const [dragged, setDragged] = useState(null);


    const onDragStart = useCallback((e, item) => {
        setDragged(item);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", JSON.stringify(item));
    }, []);


    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }, []);


    const onDrop = useCallback(
        (e, toColumn) => {
            e.preventDefault();
            let data = null;
            try {
                data = JSON.parse(e.dataTransfer.getData("text/plain"));
            } catch (err) {
                data = dragged;
            }
            if (!data) return;
            if (data.fromColumn === toColumn) return;
            onMove(data.id, data.fromColumn, toColumn);
            setDragged(null);
        },
        [dragged, onMove]
    );


    const onDragEnd = useCallback(() => setDragged(null), []);


    return { dragged, onDragStart, onDragOver, onDrop, onDragEnd };
}