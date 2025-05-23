import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import useMediaQuery from "../../hooks/useMediaQuery"; // Custom hook

const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width: 824px)");

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
    setCollapsed(false);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-gray-50 mt-[4.5rem]">
      <Sidebar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        collapsed={collapsed}
        onToggle={() =>
          isMobile ? setSidebarOpen(sidebarOpen) : setCollapsed(!collapsed)
        }
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-auto">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isMobile ? "ml-0" : collapsed ? "ml-16" : "ml-40"
          }`}
        >
          <Topbar />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
