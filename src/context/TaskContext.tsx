import React, { createContext, useContext, useState, useEffect } from "react";
import { Task } from "../types/types";
import { useActivityLog } from "../hooks/UseActivityLog";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskStatus: (
    id: string,
    status: string,
    title?: string,
    subheading?: string,
    description?: string
  ) => void;
  updateTask: (id: string, updatedFields: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { addLog } = useActivityLog();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    addLog(`Created task "${task.title}"`);
  };

  const updateTaskStatus = (
    id: string,
    status: string,
    title?: string,
    subheading?: string,
    description?: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              title: title ?? task.title,
              subheading: subheading ?? task.subheading,
              description: description ?? task.description,
            }
          : task
      )
    );

    addLog(`Updated task "${title ?? id}" to status "${status}"`);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );

    if (updatedFields.title || updatedFields.status) {
      addLog(
        `Updated task "${updatedFields.title ?? id}"${
          updatedFields.status ? ` to status "${updatedFields.status}"` : ""
        }`
      );
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    if (task) {
      addLog(`Deleted task "${task.title}"`);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTaskStatus, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
