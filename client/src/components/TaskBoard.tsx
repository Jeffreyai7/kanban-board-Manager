import React, { useState, useRef } from "react";
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
import SearchBar from "./layout/Topbar/Searchbar";

const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  needreview: "Need Review",
  done: "Done",
};

const TaskBoard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const taskRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [modal, setModal] = useState<null | {
    mode: "add" | "edit" | "delete";
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

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Scroll into view handler
  const scrollToTask = (taskId: string) => {
    const el = taskRefs.current[taskId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring", "ring-blue-500");
      setTimeout(() => {
        el.classList.remove("ring", "ring-blue-500");
      }, 2000);
    }
  };

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

  const OpenDeleteModal = (task: Task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setModal({ mode: "delete", task });
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
    closeModal();
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

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-black">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold mb-8 text-left dark:text-gray-100">
          Hello Prince
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // tasks={tasks}
          onSelectTask={scrollToTask}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto xl:grid-cols-4 gap-4 space-y-7 justify-center w-full">
          {Object.entries(COLUMN_LABELS).map(([status, label]) => {
            // const columnTasks = tasks.filter((t) => t.status === status);
            const columnTasks = filteredTasks.filter(
              (t) => t.status === status
            );
            return (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`border border-gray-300 rounded-lg max-w-80 w-full flex flex-col p-4 transition mx-auto ${
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
                      {columnTasks.length === 0 ? (
                        <div className="text-black text-center text-sm italic">
                          No tasks
                        </div>
                      ) : (
                        columnTasks.map((task, idx) => (
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
                                    ? "border-blue-400 bg-blue-100 "
                                    : "border-gray-100"
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
                                        onClick={() => OpenDeleteModal(task)}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {modal &&
        (modal.mode === "delete" ? (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
              <p className="mb-4">
                Are you sure you want to delete the task{" "}
                <strong>{modal.task?.title}</strong>?
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" size="md" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  size="md"
                  variant="delete"
                  onClick={() => handleDeleteTask(modal.task?.id || "")}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Add/Edit Modal
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">
                {modal.mode === "add" ? "Add Task" : "Edit Task"}
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full border rounded px-2 py-1"
                  value={form.title}
                  onChange={handleFormChange}
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="w-full border rounded px-2 py-1"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
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
        ))}
    </div>
  );
};

export default TaskBoard;
