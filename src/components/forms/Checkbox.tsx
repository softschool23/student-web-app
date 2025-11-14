import React from "react";
import { cn } from "@/src/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = ({
  label,
  error,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div className="mb-2 md:mb-3">
      <div className="flex items-center gap-2 md:gap-3">
        <input
          {...props}
          type="checkbox"
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 rounded border transition-all duration-200",
            "text-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1",
            "bg-white dark:bg-gray-800",
            "border-gray-300 dark:border-gray-600",
            "dark:focus:ring-offset-gray-800",
            "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
            className
          )}
        />
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="text-sm md:text-base text-gray-700 dark:text-gray-300 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
      {error && <p className="text-error text-xs md:text-sm mt-1.5">{error}</p>}
    </div>
  );
};
