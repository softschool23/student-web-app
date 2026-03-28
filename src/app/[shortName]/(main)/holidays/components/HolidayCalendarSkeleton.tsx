import { Skeleton } from "@/src/components/ui/Skeleton";

const HolidayCalendarSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <Skeleton className="h-6 w-36" />
        <div className="flex gap-2">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <Skeleton className="w-9 h-9 rounded-lg" />
        </div>
      </div>

      {/* Day name row */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-6 mx-auto w-8 rounded" />
        ))}
      </div>

      {/* Calendar days — 5 rows */}
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="grid grid-cols-7 gap-1 md:gap-2 mt-1">
          {Array.from({ length: 7 }).map((_, col) => (
            <Skeleton key={col} className="aspect-square rounded-lg" />
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-4">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
    </div>
  );
};

export default HolidayCalendarSkeleton;
