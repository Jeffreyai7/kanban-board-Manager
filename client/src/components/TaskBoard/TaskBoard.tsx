import React, { useState } from "react";
import { z, ZodError } from "zod";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { TaskStatus, Task } from "../../types/types";
import Button from "../Button";
import { useTaskContext } from "../../context/TaskContext";
import { useOutletContext } from "react-router-dom";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { taskFormSchema } from "../../lib/utils";

const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  needreview: "Need Review",
  done: "Done",
};

const TaskBoard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const { taskRefs } = useOutletContext<{
    taskRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  }>();

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

  const [errors, setErrors] = useState<{ title?: string }>({});

  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const openDeleteModal = (task: Task) => {
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
    try {
      taskFormSchema.parse(form);
      if (!modal || !modal.status) return;

      const newTask: Task = {
        id: uuidv4(),
        title: form.title,
        description: form.description,
        status: form.status as TaskStatus,
      };
      addTask(newTask);
      setErrors({});
      closeModal();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: { title?: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0] === "title") {
            fieldErrors.title = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleEditTask = () => {
    try {
      taskFormSchema.parse(form);
      if (!modal?.task || !form.status) return;

      updateTask({
        ...modal.task,
        title: form.title,
        description: form.description,
        status: form.status,
      });
      setErrors({});
      closeModal();
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: { title?: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0] === "title") {
            fieldErrors.title = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto xl:grid-cols-4 gap-4 space-y-7 justify-center w-full">
          {Object.entries(COLUMN_LABELS).map(([status, label]) => {
            const columnTasks = filteredTasks.filter(
              (t) => t.status === status
            );

            return (
              <Column
                key={status}
                status={status as TaskStatus}
                label={label}
                tasks={columnTasks}
                onAdd={openAddModal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                taskRefs={taskRefs}
              />
            );
          })}
        </div>
      </DragDropContext>

      {modal && (
        <TaskModal
          mode={modal.mode}
          form={form}
          errors={errors}
          onChange={handleFormChange}
          onCancel={closeModal}
          onSubmit={modal.mode === "add" ? handleAddTask : handleEditTask}
          onDelete={
            modal.mode === "delete"
              ? () => handleDeleteTask(modal.task?.id || "")
              : undefined
          }
          task={modal.task}
          columnLabels={COLUMN_LABELS}
        />
      )}
    </div>
  );
};

export default TaskBoard;
