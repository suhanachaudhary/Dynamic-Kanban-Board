
export default function TaskCard({ task, columnId, onDragStart, onDragEnd, onDelete, onEdit }) {
    return (
        <div
            className="bg-white rounded-lg shadow p-4 mb-3 cursor-grab"
            draggable
            onDragStart={(e) => onDragStart(e, task, columnId)}
            onDragEnd={onDragEnd}
        >
            <h4 className="font-semibold text-lg">{task.title}</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="mt-2 flex gap-2">
                <button
                    onClick={() => onEdit(task)}
                    className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id, columnId)}
                    className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}


// export default function TaskCard({ task, columnId, onDragStart, onDragEnd, onDelete, onEdit }) {
//     return (
//         <div
//             draggable
//             onDragStart={(e) => onDragStart(e, { id: task.id, fromColumn: columnId })}
//             onDragEnd={onDragEnd}
//             className="bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition cursor-grab"
//         >
//             <div className="flex justify-between items-start gap-2">
//                 <div>
//                     <h4 className="font-medium">{task.title}</h4>
//                     {task.description && (
//                         <p className="text-sm text-gray-600 mt-1">{task.description}</p>
//                     )}
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                     <button
//                         onClick={() => onEdit(task.id)}
//                         className="text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200"
//                     >
//                         Edit
//                     </button>
//                     <button
//                         onClick={() => onDelete(task.id)}
//                         className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }