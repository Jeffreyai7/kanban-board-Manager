import { NavLink } from "react-router-dom";
import { NavItemProps } from "../../../types/types";

export const NavItem = ({ icon, to, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-lg transition-all duration-200 w-full ${
          collapsed ? "justify-center p-3" : "px-4 py-3"
        } ${
          isActive
            ? "bg-gray-100 text-primary"
            : "bg-primary text-white hover:bg-gray-100 hover:text-primary"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      )}
    </NavLink>
  );
};
