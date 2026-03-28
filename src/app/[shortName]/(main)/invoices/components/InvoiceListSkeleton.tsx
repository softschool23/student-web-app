import { Skeleton } from "@/src/components";

const InvoiceSummaryCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-gray-800 p-3 md:p-4"
        >
          <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InvoiceCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <div className="space-y-1.5">
      <Skeleton className="h-3 w-10" />
      <div className="space-y-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  </div>
);

const InvoiceListSkeleton = () => (
  <div className="space-y-6">
    <InvoiceSummaryCardSkeleton />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <InvoiceCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default InvoiceListSkeleton;
