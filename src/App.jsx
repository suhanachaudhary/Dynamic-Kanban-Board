
import { useState, useEffect, useCallback } from "react";
import TaskForm from "./TaskForm";
import Column from "./Column";
import TaskCard from "./TaskCard";
import EditForm from "./EditForm";
import useLocalStorage from "./hooks/useLocalStorage";
import useDragDrop from "./hooks/useDragDrop";

export default function App() {
  const [board, setBoard] = useLocalStorage("kanban-board-v1", {
    todo: [],
    progress: [],
    done: [],
  });

  const [editing, setEditing] = useState(null);

  // inside App.jsx
  const onMove = useCallback(
    (taskId, fromColumn, toColumn) => {
      setBoard((prev) => {
        const updated = { ...prev };

        // find the task
        const task = prev[fromColumn].find((t) => t.id === taskId);
        if (!task) return prev;

        // remove from old column
        updated[fromColumn] = prev[fromColumn].filter((t) => t.id !== taskId);

        // add to new column
        updated[toColumn] = [task, ...prev[toColumn]];

        return updated;
      });
    },
    [setBoard]
  );


  useEffect(() => {
    if (
      board.todo.length === 0 &&
      board.progress.length === 0 &&
      board.done.length === 0
    ) {
      setBoard((prev) => ({
        ...prev,
        todo: [
          {
            id: genId(),
            title: "Welcome!",
            description: "Drag me to In Progress.",
            createdAt: Date.now(),
          },
        ],
      }));
    }
  }, []);

  function genId() {
    return Math.random().toString(36).slice(2, 9);
  }

  const addTask = useCallback(
    ({ title, description }) => {
      const newTask = {
        id: genId(),
        title,
        description,
        createdAt: Date.now(),
      };
      setBoard((prev) => ({ ...prev, todo: [newTask, ...prev.todo] }));
    },
    [setBoard]
  );

  const deleteTask = useCallback(
    (taskId, columnId) => {
      setBoard((prev) => ({
        ...prev,
        [columnId]: prev[columnId].filter((t) => t.id !== taskId),
      }));
    },
    [setBoard]
  );

  const startEdit = useCallback((task) => setEditing(task), []);
  const cancelEdit = useCallback(() => setEditing(null), []);
  const saveEdit = useCallback(
    (taskId, values) => {
      setBoard((prev) => {
        const updated = { ...prev };
        for (const col of ["todo", "progress", "done"]) {
          updated[col] = updated[col].map((t) =>
            t.id === taskId ? { ...t, ...values } : t
          );
        }
        return updated;
      });
      setEditing(null);
    },
    [setBoard]
  );

  const dragHandlers = useDragDrop(onMove);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Dynamic Kanban Board</h1>

        <TaskForm onAdd={addTask} />

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Column
            title="To Do"
            columnId="todo"
            tasks={board.todo}
            onDrop={dragHandlers.onDrop}
            onDragOver={dragHandlers.onDragOver}
          >
            {board.todo.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId="todo"
                onDragStart={(e) => dragHandlers.onDragStart(e, { ...task, fromColumn: "todo" })}
                onDragEnd={dragHandlers.onDragEnd}
                onDelete={deleteTask}
                onEdit={startEdit}
              />
            ))}
          </Column>

          <Column
            title="In Progress"
            columnId="progress"
            tasks={board.progress}
            onDrop={dragHandlers.onDrop}
            onDragOver={dragHandlers.onDragOver}
          >
            {board.progress.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId="progress"
                onDragStart={(e) => dragHandlers.onDragStart(e, { ...task, fromColumn: "progress" })}
                onDragEnd={dragHandlers.onDragEnd}
                onDelete={deleteTask}
                onEdit={startEdit}
              />
            ))}
          </Column>

          <Column
            title="Done"
            columnId="done"
            tasks={board.done}
            onDrop={dragHandlers.onDrop}
            onDragOver={dragHandlers.onDragOver}
          >
            {board.done.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId="done"
                onDragStart={(e) =>
                  dragHandlers.onDragStart(e, { ...task, fromColumn: "done" })
                }
                onDragEnd={dragHandlers.onDragEnd}
                onDelete={deleteTask}
                onEdit={startEdit}
              />
            ))}
          </Column>
        </main>

        {editing && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-3">Edit Task</h3>
              <EditForm
                task={editing}
                onSave={(values) => saveEdit(editing.id, values)}
                onCancel={cancelEdit}
              />
            </div>
          </div>
        )}

        <footer className="mt-8 text-sm text-gray-500 text-center">
          Tip: drag cards between columns. Data persists in your browser via localStorage.
        </footer>
      </div>
    </div>
  );
}
