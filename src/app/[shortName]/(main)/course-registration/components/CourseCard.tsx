import { LockKeyhole } from "lucide-react";

import { Checkbox } from "@/src/components";
import { cn } from "@/src/lib/utils";
import {
  CourseClassification,
  CourseEnrollmentMode,
  type AvailableCourseItem,
} from "@/src/types";

interface CourseCardProps {
  item: AvailableCourseItem;
  isSelected: boolean;
  disabled: boolean;
  onToggle: (item: AvailableCourseItem) => void;
}

const CourseCard = ({
  item,
  isSelected,
  disabled,
  onToggle,
}: CourseCardProps) => {
  const isAutoAdded = item.enrollmentMode === CourseEnrollmentMode.AutoAdd;

  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-4 transition-colors dark:bg-gray-900 md:p-5",
        isSelected
          ? "border-primary-400 bg-primary-50/30 dark:border-primary-700 dark:bg-primary-900/10"
          : "border-gray-200 dark:border-gray-700",
      )}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <Checkbox
          id={`course-${item.course._id}`}
          checked={isSelected}
          disabled={disabled}
          aria-label={`Select ${item.course.code}`}
          onChange={() => onToggle(item)}
          className="mt-1"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                {item.course.code}
              </p>
              <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white md:text-lg">
                {item.course.title}
              </h3>
            </div>
            <span className="shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {item.course.creditUnit} credit
              {item.course.creditUnit === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                item.classification === CourseClassification.Core
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
              )}
            >
              {item.classification}
            </span>
            {item.required && (
              <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                Required
              </span>
            )}
            {isAutoAdded && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <LockKeyhole className="h-3 w-3" />
                Automatically added
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
