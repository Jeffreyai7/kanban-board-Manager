import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "delete" | "edit";
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none cursor-pointer";

const sizeStyles = {
  xs: "px-2 py-0.5 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantStyles = {
  primary: "bg-primary text-white hover:opacity-80",
  secondary:
    "bg-secondary text-white hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
  outline:
    "border border-primary text-primary hover:opacity-80 dark:text-white",
  delete:
    "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-700 dark:text-white dark:hover:bg-red-600",
  edit: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
