import React from "react";
import { cn } from "@/src/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "dark:focus:ring-offset-gray-800",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "min-h-[44px]" // Minimum touch target height for mobile
  );

  const variantClasses: Record<ButtonVariant, string> = {
    primary: cn(
      "bg-primary-500 hover:bg-primary-600 focus:bg-primary-600",
      "text-white",
      "focus:ring-primary-500"
    ),
    secondary: cn(
      "bg-secondary-500 hover:bg-secondary-600 focus:bg-secondary-600",
      "text-white",
      "focus:ring-secondary-500"
    ),
    outline: cn(
      "border border-gray-300 dark:border-gray-600",
      "bg-white dark:bg-gray-800",
      "text-gray-700 dark:text-gray-300",
      "hover:bg-gray-50 dark:hover:bg-gray-700",
      "focus:ring-primary-500"
    ),
    ghost: cn(
      "text-gray-700 dark:text-gray-300",
      "hover:bg-gray-100 dark:hover:bg-gray-800",
      "focus:ring-primary-500"
    ),
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs md:text-sm",
    md: "px-4 py-2 md:py-2.5 text-sm md:text-base",
    lg: "px-5 md:px-6 py-2.5 md:py-3 text-base md:text-lg",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (loading || disabled) && "opacity-50 cursor-not-allowed",
        className,
        "cursor-pointer"
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
