import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "To Do", count: 8 },
  { name: "In Progress", count: 4 },
  { name: "Need Review", count: 2 },
  { name: "Done", count: 10 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value="24" color="bg-blue-500" />
        <StatCard title="In Progress" value="4" color="bg-yellow-500" />
        <StatCard title="Need Review" value="2" color="bg-purple-500" />
        <StatCard title="Completed" value="10" color="bg-green-500" />
      </div>

      {/* Chart + Recent Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Task Status Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="border-b pb-2">
              ✅ Completed: Fix header alignment
            </li>
            <li className="border-b pb-2">
              ⏳ In Progress: Build login component
            </li>
            <li className="border-b pb-2">
              📝 To Do: Create onboarding screens
            </li>
            <li>📌 Review: Refactor dashboard UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; color: string }> = ({
  title,
  value,
  color,
}) => (
  <div className={`p-4 rounded-lg shadow text-white ${color}`}>
    <p className="text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
