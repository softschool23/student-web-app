import { Skeleton } from "@/src/components";

const CourseRegistrationFiltersSkeleton = () => (
  <section className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 md:p-5">
    <div className="mb-4 space-y-2">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-4 w-80 max-w-full" />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      ))}
    </div>
  </section>
);

export default CourseRegistrationFiltersSkeleton;
