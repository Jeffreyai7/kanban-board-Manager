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
// import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Dashboard: React.FC = () => {
  const { tasks } = useTaskContext();

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

    return counts;
  }, [tasks]);

  const chartData = [
    { name: "To Do", count: statusCounts["todo"] },
    { name: "In Progress", count: statusCounts["inprogress"] },
    { name: "Need Review", count: statusCounts["needreview"] },
    { name: "Done", count: statusCounts["done"] },
  ];

  const totalTasks = tasks.length;
  // const scrollStats = (direction: "left" | "right") => {
  //   const container = document.getElementById("statScrollContainer");
  //   if (container) {
  //     const scrollAmount = 180; // match min-width + spacing
  //     container.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };
  const userName = "Prince";

  return (
    <div className="p-6 bg-gray-100 dark:bg-primary min-h-screen space-y-2 md:space-y-6">
      <h1 className="text-lg md:text-2xl font-semibold text-primary dark:text-gray-100">
        <span>{`${userName}'s`}</span> Dashboard Overview
      </h1>

      <div
        id="statScrollContainer"
        className="flex space-x-4 overflow-x-auto pb-2"
      >
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
      {/* buttons */}
      {/* <div className="flex md:hidden justify-end gap-2 space-y-2.5">
        <span
          onClick={() => scrollStats("left")}
          className="h-full px-2 bg-white shadow-md rounded-full"
        >
          <BsArrowLeft />
        </span>
        <span
          onClick={() => scrollStats("right")}
          className="h-full px-2 bg-white bg-opacity-80 shadow-md rounded-full"
        >
          <BsArrowRight />
        </span>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-[70fr_20fr] gap-6">
        <div className="bg-white dark:bg-gray-300 rounded-lg shadow p-4">
          <h2 className="text-lg text-gray-800 font-semibold mb-4">
            Task Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              {/* <Tooltip /> */}
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {tasks && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
              Recent Tasks
            </h2>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-100">
              {/* {tasks
                .slice(-4)
                .reverse()
                .map((task) => (
                  <li key={task.id} className="border-b pb-2">
                    {statusEmoji(task.status)} {task.status}: {task.title}
                  </li>
                ))} */}
              {tasks
                .slice(-4)
                .reverse()
                .map((task) => (
                  <li>
                    {statusEmoji(task.status)} {statusTitle(task.status)}:{" "}
                    {task.title}
                  </li>
                ))}
            </ul>
          </div>
        )}
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

// Helper to render title
const statusTitle = (status: string) => {
  switch (status) {
    case "done":
      return "Done";
    case "inprogress":
      return "In progress";
    case "todo":
      return "To do";
    case "needreview":
      return "Need review";
    default:
      return "Todo";
  }
};

const StatCard: React.FC<{ title: string; value: string; color: string }> = ({
  title,
  value,
  color,
}) => (
  <div
    className={`p-4 snap-start rounded-lg shadow text-white min-w-36 w-full ${color}`}
  >
    <p className="text-sm md:text-lg font-medium">{title}</p>
    <p className="text-sm md:text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
