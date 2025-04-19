import { AnimatePresence, motion } from "framer-motion";
import { FiHome, FiMenu, FiCheckSquare, FiSettings } from "react-icons/fi";
import { NavItem } from "./NavItem";

const sidebarVariants = {
  open: { width: 150 },
  collapsed: { width: 80 },
  closed: { width: 55 },
};

type SidebarProps = {
  isOpen: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const Sidebar = ({ isOpen, collapsed, onToggle, onClose }: SidebarProps) => {
  const isSidebarVisible = isOpen || !collapsed;

  return (
    <>
      <motion.aside
        initial={false}
        animate={!isOpen ? "closed" : collapsed ? "collapsed" : "open"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-md transition-all"
      >
        {/* Header with Logo and Toggle */}
        <div className="flex h-16 items-center justify-between px-4">
          {isSidebarVisible && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 border border-gray-200 rounded p-1">
                <div className="h-5 w-1.5 bg-blue-700 rounded" />
                <div className="h-3 w-1.5 bg-blue-700 rounded" />
              </div>
              {!collapsed && (
                <p className="text-lg font-bold whitespace-nowrap hidden md:block">
                  Kanban
                </p>
              )}
            </div>
          )}

          <button
            onClick={onToggle}
            className="hidden md:block p-2 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <AnimatePresence>
          {isSidebarVisible && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 space-y-1 p-2 overflow-y-auto"
            >
              <NavItem
                icon={<FiHome size={20} />}
                to="/dashboard"
                label="Overview"
                collapsed={collapsed}
              />
              <NavItem
                icon={<FiCheckSquare size={20} />}
                to="/dashboard/tasks"
                label="Tasks"
                collapsed={collapsed}
              />
              <NavItem
                icon={<FiSettings size={20} />}
                to="/dashboard/settings"
                label="Settings"
                collapsed={collapsed}
              />
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
