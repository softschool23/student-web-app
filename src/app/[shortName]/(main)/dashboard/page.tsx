"use client";

import { AlertCircle } from "lucide-react";
import { PageHeader } from "@/src/components";
import { useDashboard } from "./hooks/useDashboard";
import WelcomeCard from "./components/WelcomeCard";
import WelcomeCardSkeleton from "./components/WelcomeCardSkeleton";
import StatsGrid from "./components/StatsGrid";
import StatsGridSkeleton from "./components/StatsGridSkeleton";
import CurrentTermCard from "./components/CurrentTermCard";
import CurrentTermCardSkeleton from "./components/CurrentTermCardSkeleton";
import SubjectsListCard from "./components/SubjectsListCard";
import SubjectsListCardSkeleton from "./components/SubjectsListCardSkeleton";

const Dashboard = () => {
  const {
    student,
    sessionControl,
    isStudentLoading,
    isSessionLoading,
    isError,
    error,
  } = useDashboard();

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back to your student portal"
      />

      {/* Error state */}
      {isError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">
              Failed to load dashboard data
            </p>
            <p className="text-sm mt-1 opacity-80">
              {(error as Error)?.message ?? "An unexpected error occurred."}
            </p>
          </div>
        </div>
      )}

      {/* Welcome Card */}
      {isStudentLoading ? (
        <WelcomeCardSkeleton />
      ) : (
        student && <WelcomeCard student={student} />
      )}

      {/* Stats Grid */}
      {isStudentLoading ? (
        <StatsGridSkeleton />
      ) : (
        student && <StatsGrid student={student} />
      )}

      {/* Term Info + Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {isSessionLoading ? (
          <CurrentTermCardSkeleton />
        ) : (
          sessionControl && <CurrentTermCard sessionControl={sessionControl} />
        )}

        {isStudentLoading ? (
          <SubjectsListCardSkeleton />
        ) : (
          student && <SubjectsListCard subjects={student.subjects ?? []} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
