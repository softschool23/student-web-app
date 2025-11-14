"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/src/lib/utils";

type InputVariant = "default" | "floating";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  showPasswordToggle?: boolean;
}

export const Input = ({
  label,
  error,
  className,
  variant = "default",
  showPasswordToggle = false,
  type: propType = "text",
  value,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const isPassword =
    propType === "password" || (propType === "text" && showPasswordToggle);
  const inputType = isPassword && showPassword ? "text" : propType;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  if (variant === "floating") {
    return (
      <div className="mb-3 md:mb-4">
        <div className="relative">
          <input
            {...props}
            type={inputType}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=" "
            className={cn(
              "peer w-full px-3 py-2.5 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base",
              "border focus:outline-none focus:ring-2 focus:ring-offset-1",
              "bg-white dark:bg-gray-800",
              "text-gray-900 dark:text-gray-100",
              "placeholder:transparent",
              error
                ? "border-error focus:border-error focus:ring-error/20"
                : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/20",
              "dark:focus:ring-offset-gray-800",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isPassword && "pr-10 md:pr-12",
              className
            )}
          />
          <label
            htmlFor={props.id || props.name}
            className={cn(
              "absolute left-3 transition-all duration-200 pointer-events-none text-xs md:text-sm",
              "text-gray-500 dark:text-gray-400",
              "peer-placeholder-shown:top-2.5 md:peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base",
              "peer-focus:-top-2 peer-focus:left-2 peer-focus:text-xs md:peer-focus:text-sm peer-focus:text-primary-500",
              "peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1",
              (isFocused || hasValue || value) &&
                "-top-2 left-2 text-xs md:text-sm bg-white dark:bg-gray-800 px-1 text-primary-500",
              error && "peer-focus:text-error text-error"
            )}
          >
            {label}
          </label>

          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className={cn(
                "absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2",
                "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
                "focus:outline-none focus:text-primary-500",
                "transition-colors duration-200",
                "p-1"
              )}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Eye className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className={cn("text-xs mt-1", "text-error")}>{error}</p>}
      </div>
    );
  }

  // Default variant
  return (
    <div className="mb-3 md:mb-4">
      <label
        className={cn(
          "block text-xs md:text-sm font-medium mb-1.5 md:mb-2",
          "text-gray-700 dark:text-gray-300"
        )}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={inputType}
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full px-3 py-2 md:py-2.5 rounded-lg transition-colors text-sm md:text-base",
            "border focus:outline-none focus:ring-2 focus:ring-offset-1",
            "bg-white dark:bg-gray-800",
            "text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            error
              ? "border-error focus:border-error focus:ring-error/20"
              : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/20",
            "dark:focus:ring-offset-gray-800",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isPassword && "pr-10 md:pr-12",
            className
          )}
        />

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className={cn(
              "absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2",
              "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
              "focus:outline-none focus:text-primary-500",
              "transition-colors duration-200",
              "p-1"
            )}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <Eye className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className={cn("text-xs mt-1", "text-error")}>{error}</p>}
    </div>
  );
};
