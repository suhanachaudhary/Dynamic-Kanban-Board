
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
