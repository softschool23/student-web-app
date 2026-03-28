import { Skeleton } from "@/src/components/ui/Skeleton";

const SubjectCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 md:p-6 space-y-4">
        <Skeleton className="h-3 w-1/3" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0" />
          <Skeleton className="h-4 w-2/5" />
        </div>
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <Skeleton className="h-3 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
    </div>
  );
};

export default SubjectCardSkeleton;
