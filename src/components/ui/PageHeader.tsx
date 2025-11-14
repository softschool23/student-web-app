import { cn } from "@/src/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={cn(className)}>
      <h1 className="text-lg lg:text-2xl font-bold text-gray-700 dark:text-gray-100">
        {title}
      </h1>
      {description && (
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
};
