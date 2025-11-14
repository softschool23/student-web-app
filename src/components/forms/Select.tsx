"use client";

import ReactSelect, {
  StylesConfig,
  SingleValue,
  ActionMeta,
} from "react-select";
import { cn } from "@/src/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value?: Option;
  onChange?: (option: Option | null) => void;
  label?: string;
  className?: string;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  label,
  className,
  error,
  placeholder = "Select...",
  isDisabled = false,
}: CustomSelectProps) => {
  const handleChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--input)",
      borderColor: error
        ? "#ef4444"
        : state.isFocused
        ? "#007982"
        : "var(--border)",
      borderRadius: "0.5rem",
      padding: "0.125rem",
      boxShadow: state.isFocused ? "0 0 0 1px #007982" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#007982" : "var(--border)",
      },
      minHeight: "47px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--input)",
      border: "1px solid var(--border)",
      borderRadius: "0.5rem",
      marginTop: "0.25rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007982"
        : state.isFocused
        ? "rgba(0, 121, 130, 0.1)"
        : "transparent",
      color: state.isSelected ? "#ffffff" : "var(--foreground)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#007982",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--foreground)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    input: (provided) => ({
      ...provided,
      color: "var(--foreground)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6b7280",
      "&:hover": {
        color: "#007982",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <ReactSelect<Option, false>
        options={options}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        classNamePrefix="react-select"
        isDisabled={isDisabled}
      />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};
