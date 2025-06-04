import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskStatus, Task } from "../types/types";
import Button from "./Button";
import TaskCard from "./TaskCard";

interface ColumnProps {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  onAdd: (status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  taskRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

const Column: React.FC<ColumnProps> = ({
  status,
  label,
  tasks,
  onAdd,
  onEdit,
  onDelete,
  taskRefs,
}) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-lg max-w-80 w-full flex flex-col p-4 transition mx-auto ${
            snapshot.isDraggingOver ? "bg-blue-50" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-lg">{label}</span>
            <Button size="sm" onClick={() => onAdd(status)}>
              + Add
            </Button>
          </div>
          <div className="flex-1 space-y-3">
            {tasks.length === 0 ? (
              <div className="text-black text-center text-sm italic">
                No tasks
              </div>
            ) : (
              tasks.map((task, idx) => (
                <Draggable draggableId={task.id} index={idx} key={task.id}>
                  {(provided, snapshot) => (
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      provided={provided}
                      snapshot={snapshot}
                      taskRef={(el) => {
                        if (taskRefs) taskRefs.current[task.id] = el;
                      }}
                    />
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
};

export default Column;
