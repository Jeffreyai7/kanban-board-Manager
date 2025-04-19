import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { TaskStatus, Task } from "../types/types";
import Button from "./Button";

const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  needreview: "Need Review",
  done: "Done",
};

// ---- Main Kanban Board Component ----
const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState<null | {
    mode: "add" | "edit";
    status?: TaskStatus;
    task?: Task;
  }>(null);

  // form-- add status
  const [form, setForm] = useState<{
    title: string;
    description: string;
    status?: TaskStatus;
  }>({
    title: "",
    description: "",
    status: "todo",
  });

  // useEffect(() => {

  //   const stored = localStorage.getItem("kanban-tasks");
  //   if (stored) {
  //     setTasks(JSON.parse(stored));
  //     console.log("Loaded from localStorage:", JSON.parse(stored));
  //   } else {
  //     // If no data in localStorage, fetch from JSON
  //     fetch("/data/data.json")
  //       .then((response) => response.json())
  //       .then((data: Task[]) => {
  //         setTasks(data);
  //         localStorage.setItem("kanban-tasks", JSON.stringify(data));
  //         console.log("Loaded from data.json:", data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem("kanban-tasks");

    if (stored) {
      // Load from localStorage if available
      setTasks(JSON.parse(stored));
      console.log("✅ Loaded from localStorage");
    } else {
      // First-time load from data.json
      fetch("/data/data.json")
        .then((response) => response.json())
        .then((data: Task[]) => {
          setTasks(data);
          localStorage.setItem("kanban-tasks", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("❌ Error fetching data.json:", error);
        });
    }
  }, []);

  // Save to localStorage on any update
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Modal controls
  const openAddModal = (status: TaskStatus) => {
    setForm({ title: "", description: "", status });
    setModal({ mode: "add", status });
  };

  const openEditModal = (task: Task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setModal({ mode: "edit", task });
  };

  const closeModal = () => setModal(null);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTask = () => {
    if (!form.title.trim()) return;
    if (!modal || !modal.status) return;

    const newTask: Task = {
      id: uuidv4(),
      title: form.title,
      description: form.description,
      status: form.status as TaskStatus,
    };
    setTasks((prev) => [...prev, newTask]);
    closeModal();
  };

  const handleEditTask = () => {
    if (!form.title.trim() || !modal?.task || !form.status) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === modal.task!.id
          ? {
              ...t,
              title: form.title,
              description: form.description,
              status: form.status as TaskStatus,
            }
          : t
      )
    );
    closeModal();
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Drag and drop handler
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const draggedTask = tasks.find((t) => t.id === draggableId);
    if (!draggedTask) return;

    const updatedTask = {
      ...draggedTask,
      status: destination.droppableId as TaskStatus,
    };

    const newTasks = tasks.filter((t) => t.id !== draggableId);
    const destTasks = newTasks.filter(
      (t) => t.status === destination.droppableId
    );

    let insertAt = 0;
    for (let i = 0, count = 0; i < newTasks.length; i++) {
      if (newTasks[i].status === destination.droppableId) {
        if (count === destination.index) {
          insertAt = i;
          break;
        }
        count++;
      }
      if (i === newTasks.length - 1) insertAt = newTasks.length;
    }
    if (destTasks.length === 0) insertAt = newTasks.length;

    newTasks.splice(insertAt, 0, updatedTask);
    setTasks(newTasks);
    // updateTasks(newTasks);
  };

  return (
    <div className="p-6 bg-gray-100 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Kanban Board</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto justify-center">
          {Object.entries(COLUMN_LABELS).map(([status, label]) => {
            const columnTasks = tasks.filter((t) => t.status === status);
            return (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-lg shadow-md w-80 flex flex-col p-4 min-h-[400px] transition ${
                      snapshot.isDraggingOver ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-lg">{label}</span>
                      <Button
                        size="sm"
                        onClick={() => openAddModal(status as TaskStatus)}
                      >
                        + Add
                      </Button>
                    </div>
                    <div className="flex-1 space-y-3">
                      {columnTasks.map((task, idx) => (
                        <Draggable
                          draggableId={task.id}
                          index={idx}
                          key={task.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-gray-50 rounded p-3 shadow flex flex-col gap-2 border ${
                                snapshot.isDragging
                                  ? "border-blue-400 bg-blue-100"
                                  : "border-gray-200"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                  {task.title}
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    className="text-blue-500 hover:underline text-xs"
                                    onClick={() => openEditModal(task)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-red-500 hover:underline text-xs"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              {task.description && (
                                <div className="text-gray-600 text-sm">
                                  {task.description}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              {modal.mode === "add" ? "Add Task" : "Edit Task"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                className="w-full border rounded px-2 py-1"
                value={form.title}
                onChange={handleFormChange}
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                className="w-full border rounded px-2 py-1"
                value={form.description}
                onChange={handleFormChange}
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="w-full border rounded px-2 py-1"
                value={form.status}
                onChange={handleFormChange}
              >
                {Object.entries(COLUMN_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              {modal.mode === "add" ? (
                <button
                  className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleAddTask}
                >
                  Add
                </button>
              ) : (
                <button
                  className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                  onClick={handleEditTask}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
