
import React, { useState } from "react";


export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title: title.trim(), description: description.trim() });
        setTitle("");
        setDescription("");
    }


    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-6">
            <div className="flex gap-3 items-center">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title (required)"
                    className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                >
                    Add
                </button>
            </div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description (optional)"
                className="w-full mt-3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={2}
            />
        </form>
    );
}