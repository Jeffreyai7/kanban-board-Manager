import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTasks } from "../context/TaskContext";

const TaskChart = () => {
  const { tasks } = useTasks();

  // Group tasks by status
  const data = ["todo", "in progress", "done"].map((status) => ({
    status,
    count: tasks.filter((task) => task.status === status).length,
  }));

  return (
    <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-md shadow w-full max-w-2xl mx-auto">
      <h3 className="font-semibold text-lg mb-4 text-center">
        Task Status Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
