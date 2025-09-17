
import React from "react";


export default function Column({ title, columnId, tasks, children, onDrop, onDragOver }) {
    return (
        <div className="flex-1 min-w-[260px] max-w-md bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center justify-between">
                {title} <span className="text-sm text-gray-500">{tasks.length}</span>
            </h3>
            <div
                className="space-y-3 min-h-[120px]"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, columnId)}
            >
                {children}
            </div>
        </div>
    );
}