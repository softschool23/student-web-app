import { AlertCircle, BookX } from "lucide-react";

import { Button } from "@/src/components";

interface CourseRegistrationStateProps {
  variant: "error" | "empty";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const CourseRegistrationState = ({
  variant,
  title,
  description,
  actionLabel = "Try again",
  onAction,
}: CourseRegistrationStateProps) => {
  const Icon = variant === "error" ? AlertCircle : BookX;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon
          className={
            variant === "error"
              ? "h-6 w-6 text-red-500"
              : "h-6 w-6 text-muted-foreground"
          }
        />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {onAction && (
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default CourseRegistrationState;
