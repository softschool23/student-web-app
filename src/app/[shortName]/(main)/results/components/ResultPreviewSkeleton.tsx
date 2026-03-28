const ResultPreviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary Card Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-100 dark:border-gray-800 p-3 md:p-4 space-y-2"
            >
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12" />
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="px-4 md:px-6 py-3 flex items-center gap-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10" />
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPreviewSkeleton;
