import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  variant?: "default" | "password";
}

/**
 * Input component with optional left icon, error display, and password toggle.
 *
 * Props:
 * - icon: ReactNode to render an icon on the left side of the input.
 * - error: string to display validation error below the input and change border color.
 * - variant: 'default' | 'password' — if 'password', shows an eye icon on the right to toggle visibility.
 *
 * Usage:
 *
 * <Input
 *   type="email"
 *   placeholder="Email"
 *   icon={<Mail className="w-5 h-5 text-gray-500" />}
 *   {...register('email')}
 *   error={errors.email?.message}
 * />
 *
 * <Input
 *   variant="password"
 *   placeholder="Password"
 *   {...register('password')}
 *   error={errors.password?.message}
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, error, className, type = "text", variant = "default", ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // For password variant, toggle input type
    const inputType =
      variant === "password" ? (showPassword ? "text" : "password") : type;

    const baseStyles = cn(
      "box-border w-full h-[44px] flex items-center gap-2",
      "rounded-full border bg-white shadow-sm text-base text-black",
      "placeholder:text-muted-foreground outline-none transition-colors",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error
        ? "border-red-500 focus-visible:ring-red-400 focus-visible:border-red-500"
        : "border-[#C3BEBE] focus-visible:ring-ring/50 focus-visible:border-ring",
      className
    );

    return (
      <div className="w-full max-w-[606px] space-y-1">
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              baseStyles,
              icon ? "pl-11" : "px-[14px]",
              variant === "password" ? "pr-11" : ""
            )}
            {...props}
          />

          {variant === "password" && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
