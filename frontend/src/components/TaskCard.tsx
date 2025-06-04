import React, { useRef } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { Task } from "../types/types";
import Button from "./Button";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  taskRef?: (el: HTMLDivElement | null) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  provided,
  snapshot,
  taskRef,
}) => {
  const localRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        provided.innerRef(el); // Drag & drop ref
        if (taskRef) taskRef(el); // Custom scroll ref
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={task.id}
      className={`bg-gray-50 rounded p-3 shadow flex flex-col gap-2 border transition duration-300 ease-in-out ${
        snapshot.isDragging ? "border-blue-400 bg-blue-100" : "border-gray-100"
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
            <Button variant="edit" size="xs" onClick={() => onEdit(task)}>
              Edit
            </Button>
            <Button variant="delete" size="xs" onClick={() => onDelete(task)}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
