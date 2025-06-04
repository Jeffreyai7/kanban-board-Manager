import React, { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useTaskContext } from "../../context/TaskContext";

const MainLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 824px)");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const { tasks } = useTaskContext();

  // Refs to task elements, keyed by task id
  const taskRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to a task element smoothly and highlight briefly
  const scrollToTask = (taskId: string) => {
    const el = taskRefs.current[taskId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring", "ring-blue-500");
      setTimeout(() => {
        el.classList.remove("ring", "ring-blue-500");
      }, 2000);
    }
  };

  useEffect(() => {
    setSidebarOpen(!isMobile);
    setCollapsed(false);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        collapsed={collapsed}
        onToggle={() =>
          isMobile ? setSidebarOpen(!sidebarOpen) : setCollapsed(!collapsed)
        }
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-auto mt-14">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isMobile ? "ml-0" : collapsed ? "ml-16" : "ml-40"
          }`}
        >
          <Topbar
            isMobile={isMobile}
            collapsed={collapsed}
            taskRefs={taskRefs}
            scrollToTask={scrollToTask}
            tasks={tasks}
          />
          {/* Pass taskRefs via Outlet context to child routes */}
          <Outlet context={{ taskRefs }} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
