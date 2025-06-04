import { NavLink } from "react-router-dom";
import { NavItemProps } from "../../../types/types";

export const NavItem = ({ icon, to, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-2 transition-all duration-200 w-full py-5 ${
          collapsed ? "justify-center p-3" : "px-4 py-3"
        } ${
          isActive
            ? "text-primary bg-gray-100 dark:bg-gray-300 border-l-4 border-primary/80"
            : "bg-primary text-white hover:bg-gray-100 hover:text-primary"
        }`
      }
    >
      {collapsed && (
        <div className="flex flex-col gap-1 justify-center items-center">
          <span className="text-lg">{icon}</span>
          <span className="text-[12px]  font-medium whitespace-nowrap">
            {label}
          </span>
        </div>
      )}

      {!collapsed && (
        <div className="flex gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        </div>
      )}
    </NavLink>
  );
};
