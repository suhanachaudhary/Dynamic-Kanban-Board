
import React, { useState } from "react";


export default function EditForm({ task, onSave, onCancel }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");


    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ title: title.trim(), description: description.trim() });
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                className="w-full px-3 py-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="w-full px-3 py-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
            />
            <div className="flex gap-3 justify-end">
                <button type="button" onClick={onCancel} className="px-3 py-2 rounded bg-gray-100">Cancel</button>
                <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
            </div>
        </form>
    );
}