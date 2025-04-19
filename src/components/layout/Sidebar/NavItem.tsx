import { Link } from "react-router-dom";
// import { Tooltip } from "../../ui/Tooltip";

type NavItemProps = {
  icon: React.ReactNode;
  to: string;
  label: string;
  collapsed: boolean;
};

export const NavItem = ({ icon, to, label, collapsed }: NavItemProps) => {
  return (
    // <Tooltip content={label} disabled={!collapsed} side="right">
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-all duration-200 ${
        collapsed ? "justify-center" : "px-4"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      )}
    </Link>
    // </Tooltip>
  );
};
