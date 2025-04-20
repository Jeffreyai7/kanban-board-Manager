import { FiHome, FiCheckSquare, FiSettings } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NavItem } from "./NavItem";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type SidebarProps = {
  isMobile: boolean;
  isOpen: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const navLinks = [
  { label: "Dashboard", to: "/dashboard", icon: <FiHome /> },
  { label: "Tasks", to: "/dashboard/tasks", icon: <FiCheckSquare /> },
  { label: "Settings", to: "/dashboard/settings", icon: <FiSettings /> },
];

const Sidebar = ({
  isMobile,
  isOpen,
  collapsed,
  onToggle,
  onClose,
}: SidebarProps) => {
  const location = useLocation();

  // Auto close sidebar on route change (for mobile)
  useEffect(() => {
    if (isMobile) onClose();
  }, [location.pathname]);

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-30 bg-black/40" onClick={onClose}></div>
      )}

      <div
        className={`${
          isMobile
            ? `fixed bottom-0 left-0 right-0 h-16 flex flex-row justify-around items-center bg-primary text-white z-40 border-t`
            : `fixed top-0 left-0 h-full ${
                collapsed ? "w-16" : "w-40"
              } flex flex-col bg-primary text-white shadow-md z-40 transition-all duration-300`
        }`}
      >
        {!isMobile && (
          <div className="flex justify-end p-2">
            <button
              onClick={onToggle}
              className="text-sm text-gray-500 hover:text-black"
              title="Toggle sidebar"
            >
              {collapsed ? (
                <MdOutlineKeyboardDoubleArrowRight />
              ) : (
                <MdOutlineKeyboardDoubleArrowLeft size={30} />
              )}
            </button>
          </div>
        )}

        <nav
          className={`flex ${
            isMobile ? "flex-row w-full justify-around" : "flex-col gap-2 p-4"
          }`}
        >
          {navLinks.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              to={item.to}
              label={item.label}
              collapsed={collapsed || isMobile}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
