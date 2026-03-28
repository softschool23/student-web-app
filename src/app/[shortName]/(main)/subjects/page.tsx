"use client";

import { PageHeader } from "@/src/components";
import { AlertCircle } from "lucide-react";
import { useSubjects } from "@/src/lib/queries/useSubjects";
import SubjectCard from "./components/SubjectCard";
import SubjectCardSkeleton from "./components/SubjectCardSkeleton";
import { Skeleton } from "@/src/components/ui/Skeleton";

const SubjectsPage = () => {
  const { data, isLoading, isError } = useSubjects();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Subjects"
        description={
          isLoading ? "Loading..." : `Subjects for ${data?.class.name ?? ""}`
        }
      />

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <SubjectCardSkeleton key={i} />
          ))}

        {isError && (
          <div className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load subjects. Please try again.
            </p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          data?.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
      </div>

      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
              Total Subjects
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300">
                {data?.totalSubjects ?? 0}
              </p>
            )}
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">
              Class
            </p>
            {isLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <p className="text-lg md:text-xl font-bold text-green-700 dark:text-green-300">
                {data?.class.name ?? "—"}
              </p>
            )}
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">
              Section
            </p>
            {isLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <p className="text-lg md:text-xl font-bold text-purple-700 dark:text-purple-300">
                {data?.section.name ?? "—"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
