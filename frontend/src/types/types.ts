export type TaskStatus = "todo" | "inprogress" | "needreview" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

// export interface TaskContextType {
//   tasks: Task[];
//   addTask: (task: Task) => void;
//   updateTask: (task: Task) => void;
//   deleteTask: (id: string) => void;
// }
export type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export type NavItemProps = {
  icon: React.ReactNode;
  to: string;
  label: string;
  collapsed: boolean;
};
