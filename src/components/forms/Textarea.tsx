import React from "react";
import { cn } from "@/src/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({
  label,
  error,
  className,
  ...props
}: TextareaProps) => {
  return (
    <div className="mb-3 md:mb-4">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={cn(
          "w-full px-3 py-2.5 md:py-3 rounded-lg border transition-all duration-200 text-sm md:text-base",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          "resize-y min-h-[100px]",
          error
            ? "border-error focus:border-error focus:ring-error/20"
            : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/20",
          "dark:focus:ring-offset-gray-800",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      />
      {error && <p className="text-error text-xs md:text-sm mt-1.5">{error}</p>}
    </div>
  );
};
