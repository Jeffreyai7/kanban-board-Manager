import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../components/Dashboard";
import MainLayout from "../components/layout/MainLayout";
import Tasks from "../components/TaskBoard";
import Settings from "../components/Settings";
import { TaskProvider } from "../context/TaskContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <TaskProvider>
        <MainLayout />
      </TaskProvider>
    ),
    children: [
      {
        index: true, // /dashboard
        element: <Dashboard />,
      },
      {
        path: "tasks", // /dashboard/tasks
        element: <Tasks />,
      },
      {
        path: "settings", // /dashboard/settings
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
