import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTaskContext } from "../context/TaskContext";

const Dashboard: React.FC = () => {
  const { tasks } = useTaskContext();
  console.log("Current tasks:", tasks);

  // Group tasks by status
  const statusCounts = useMemo(() => {
    const counts = {
      todo: 0,
      inprogress: 0,
      needreview: 0,
      done: 0,
    };

    tasks.forEach((task) => {
      counts[task.status] += 1;
    });

    console.log("Updated status counts:", counts);
    return counts;
  }, [tasks]);

  const chartData = [
    { name: "To Do", count: statusCounts["todo"] },
    { name: "In Progress", count: statusCounts["inprogress"] },
    { name: "Need Review", count: statusCounts["needreview"] },
    { name: "Done", count: statusCounts["done"] },
  ];

  const totalTasks = tasks.length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-center">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks.toString()}
          color="bg-blue-500"
        />
        <StatCard
          title="To do"
          value={statusCounts["todo"].toString()}
          color="bg-red-500"
        />
        <StatCard
          title="In Progress"
          value={statusCounts["inprogress"].toString()}
          color="bg-yellow-500"
        />
        <StatCard
          title="Need Review"
          value={statusCounts["needreview"].toString()}
          color="bg-purple-500"
        />
        <StatCard
          title="Completed"
          value={statusCounts["done"].toString()}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Task Status Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              {/* <Tooltip /> */}
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {tasks
              .slice(-4)
              .reverse()
              .map((task) => (
                <li key={task.id} className="border-b pb-2">
                  {statusEmoji(task.status)} {task.status}: {task.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper to render emojis based on task status
const statusEmoji = (status: string) => {
  switch (status) {
    case "done":
      return "✅";
    case "inprogress":
      return "⏳";
    case "todo":
      return "📝";
    case "needreview":
      return "📌";
    default:
      return "🗂️";
  }
};

const StatCard: React.FC<{ title: string; value: string; color: string }> = ({
  title,
  value,
  color,
}) => (
  <div className={`p-4 rounded-lg shadow text-white ${color}`}>
    <p className="text-lg font-medium">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
