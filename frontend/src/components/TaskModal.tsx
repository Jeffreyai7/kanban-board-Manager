import React from "react";
import { TaskStatus, Task } from "../types/types";
import Button from "./Button";
// import { ZodError } from "zod";

interface TaskModalProps {
  mode: "add" | "edit" | "delete";
  form: {
    title: string;
    description: string;
    status?: TaskStatus;
  };
  errors?: { title?: string };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete?: () => void;
  task?: Task;
  columnLabels: Record<TaskStatus, string>;
}

const TaskModal: React.FC<TaskModalProps> = ({
  mode,
  form,
  errors,
  onChange,
  onCancel,
  onSubmit,
  onDelete,
  task,
  columnLabels,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {mode === "delete" ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
            <p className="mb-4">
              Are you sure you want to delete the task{" "}
              <strong>{task?.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="md" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="md" variant="delete" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {mode === "add" ? "Add Task" : "Edit Task"}
            </h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full border rounded px-2 py-1"
                value={form.title}
                onChange={onChange}
                autoFocus
              />
              {errors?.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
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
                onChange={onChange}
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
                onChange={onChange}
              >
                {Object.entries(columnLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="md" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="md" onClick={onSubmit}>
                {mode === "add" ? "Add" : "Save"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
