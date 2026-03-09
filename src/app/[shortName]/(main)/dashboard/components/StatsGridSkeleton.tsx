import { Skeleton } from "@/src/components/ui/Skeleton";

const StatsGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-7 w-28" />
          </div>
          <Skeleton className="w-12 h-12 rounded-lg shrink-0 ml-3" />
        </div>
      </div>
    ))}
  </div>
);

export default StatsGridSkeleton;
