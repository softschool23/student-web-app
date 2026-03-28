import { Skeleton } from "@/src/components/ui/Skeleton";

const WelcomeCardSkeleton = () => (
  <div className="rounded-lg p-6 md:p-8 bg-gray-100 dark:bg-gray-800">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-8 w-48 md:w-64" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="flex items-center gap-3 rounded-lg p-4 bg-gray-200 dark:bg-gray-700">
        <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeCardSkeleton;
