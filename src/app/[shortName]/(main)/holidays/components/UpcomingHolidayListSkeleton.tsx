import { Skeleton } from "@/src/components/ui/Skeleton";

const UpcomingHolidayListSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      <Skeleton className="h-6 w-44 mb-4 md:mb-6" />

      <div className="space-y-3 md:space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-3">
              <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <Skeleton className="h-4 w-2/5" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <Skeleton className="h-3 w-3/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingHolidayListSkeleton;
