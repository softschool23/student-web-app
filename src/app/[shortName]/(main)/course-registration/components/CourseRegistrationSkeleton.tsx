import { Skeleton } from "@/src/components";

const CourseRegistrationSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-20 w-full rounded-lg" />

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-24 rounded-lg" />
      ))}
    </div>

    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 rounded-lg" />
      ))}
    </div>
  </div>
);

export default CourseRegistrationSkeleton;
