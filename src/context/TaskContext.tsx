import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Task, TaskContextType } from "../types/types";

// --- Task Context ---
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// --- Theme Context ---
type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (localStorage.getItem("kanban-theme") as Theme) || "light";
    return saved;
  });

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        localStorage.setItem("kanban-tasks", JSON.stringify(data));
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("kanban-theme", theme);
  }, [theme]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* Sectional theming here */}
        <div className={theme === "dark" ? "dark" : ""}>
          <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
            {children}
          </div>
        </div>
      </ThemeContext.Provider>
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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within TaskProvider");
  }
  return context;
};
