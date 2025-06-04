import React, { createContext, useState, useContext, ReactNode } from "react";
import { useEffect } from "react";
import { Task, TaskContextType } from "../types/types";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   const stored = localStorage.getItem("kanban-tasks");
  //   if (stored) {
  //     setTasks(JSON.parse(stored));
  //   } else {
  //     fetch("/data/data.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTasks(data);
  //         localStorage.setItem("kanban-tasks", JSON.stringify(data));
  //       });
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  // }, [tasks]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched JSON data:", data); // ✅ Debug log here
        setTasks(data);
        localStorage.setItem("kanban-tasks", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const updateTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
