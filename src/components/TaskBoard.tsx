import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { TaskStatus, Task } from "../types/types";
import Button from "./Button";
import { useTaskContext } from "../context/TaskContext";

const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  needreview: "Need Review",
  done: "Done",
};

const TaskBoard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const [modal, setModal] = useState<null | {
    mode: "add" | "edit";
    status?: TaskStatus;
    task?: Task;
  }>(null);

  const [form, setForm] = useState<{
    title: string;
    description: string;
    status?: TaskStatus;
  }>({
    title: "",
    description: "",
    status: "todo",
  });

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
    addTask(newTask);
    closeModal();
  };

  const handleEditTask = () => {
    if (!form.title.trim() || !modal?.task || !form.status) return;

    updateTask({
      ...modal.task,
      title: form.title,
      description: form.description,
      status: form.status,
    });
    closeModal();
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

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

    updateTask({
      ...draggedTask,
      status: destination.droppableId as TaskStatus,
    });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-black">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-gray-100">
        Kanban Board
      </h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 space-y-7 justify-center">
          {Object.entries(COLUMN_LABELS).map(([status, label]) => {
            const columnTasks = tasks.filter((t) => t.status === status);
            return (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-lg shadow-md max-w-80 w-full flex flex-col p-4 min-h-[400px] transition ${
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
                                <h3 className="font-semibold text-sm text-violet-600 bg-violet-100 py-0.5 px-1 rounded-sm">
                                  {task.title}
                                </h3>
                              </div>
                              {task.description && (
                                <div className="text-gray-600 text-sm">
                                  {task.description}

                                  <div className="flex justify-end gap-3 mt-2">
                                    <Button
                                      variant="edit"
                                      size="xs"
                                      onClick={() => openEditModal(task)}
                                    >
                                      Edit
                                    </Button>

                                    <Button
                                      variant="delete"
                                      size="xs"
                                      onClick={() => handleDeleteTask(task.id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
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
              <Button variant="secondary" size="md" onClick={closeModal}>
                Cancel
              </Button>
              {modal.mode === "add" ? (
                <Button size="md" onClick={handleAddTask}>
                  Add
                </Button>
              ) : (
                <Button size="md" onClick={handleEditTask}>
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
