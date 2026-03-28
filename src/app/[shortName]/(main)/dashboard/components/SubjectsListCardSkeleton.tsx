import { Skeleton } from "@/src/components/ui/Skeleton";

const SubjectsListCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-4 md:mb-5">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-5 w-28" />
    </div>
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export default SubjectsListCardSkeleton;
