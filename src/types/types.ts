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
