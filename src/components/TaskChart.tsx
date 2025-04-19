import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Task, TaskStatus } from "../types/types";

interface TaskChartProps {
  tasks: Task[];
}

const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  needreview: "Need Review",
  done: "Done",
};

const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const chartData = Object.keys(COLUMN_LABELS).map((status) => ({
    status: COLUMN_LABELS[status as TaskStatus],
    count: tasks.filter((task) => task.status === status).length,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Task Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
