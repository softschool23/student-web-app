import { Skeleton } from "@/src/components/ui/Skeleton";

const CurrentTermCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-4 md:mb-5">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-5 w-48" />
    </div>
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export default CurrentTermCardSkeleton;
