import { Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  disabled = false,
}: SearchInputProps) => {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "border-gray-300 dark:border-gray-600",
          "focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      />
    </div>
  );
};

export default SearchInput;
