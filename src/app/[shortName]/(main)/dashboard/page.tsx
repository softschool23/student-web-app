"use client";

import { AlertCircle, Clock3, GraduationCap } from "lucide-react";
import { PageHeader } from "@/src/components";
import { useMe } from "@/src/lib/queries/useMe";
import {
  StudentOrganisationType,
  type CollegeStudentProfile,
  type K12StudentProfile,
} from "@/src/types";
import { useDashboard } from "./hooks/useDashboard";
import WelcomeCard from "./components/WelcomeCard";
import WelcomeCardSkeleton from "./components/WelcomeCardSkeleton";
import StatsGrid from "./components/StatsGrid";
import StatsGridSkeleton from "./components/StatsGridSkeleton";
import CurrentTermCard from "./components/CurrentTermCard";
import CurrentTermCardSkeleton from "./components/CurrentTermCardSkeleton";
import SubjectsListCard from "./components/SubjectsListCard";
import SubjectsListCardSkeleton from "./components/SubjectsListCardSkeleton";

interface DashboardErrorProps {
  error?: unknown;
}

const DashboardError = ({ error }: DashboardErrorProps) => (
  <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400">
    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
    <div>
      <p className="font-semibold text-sm">Failed to load dashboard data</p>
      <p className="text-sm mt-1 opacity-80">
        {(error as Error)?.message ?? "An unexpected error occurred."}
      </p>
    </div>
  </div>
);

interface CollegeDashboardProps {
  student: CollegeStudentProfile;
}

const CollegeDashboard = ({ student }: CollegeDashboardProps) => (
  <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
    <PageHeader
      title="Dashboard"
      description="Welcome back to your student portal"
    />

    <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-lg p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 capitalize">
            Welcome, {student.firstName}!
          </h2>
          <p className="text-primary-100 text-sm md:text-base uppercase tracking-wide">
            Registration number: {student.registrationNumber}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 shrink-0">
          <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
          <div>
            <p className="text-xs text-primary-100">Student portal</p>
            <p className="font-semibold text-sm md:text-base capitalize">
              {[student.firstName, student.middleName, student.lastName]
                .filter(Boolean)
                .join(" ")}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 text-center">
      <div className="mx-auto mb-4 flex w-12 h-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20">
        <Clock3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        More college portal features are coming soon
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Course registration is now available from the sidebar. Results,
        payments, and other college activities will appear here when they are
        ready.
      </p>
    </div>
  </div>
);

interface K12DashboardProps {
  student: K12StudentProfile;
}

const K12Dashboard = ({ student }: K12DashboardProps) => {
  const {
    sessionControl,
    subjectsData,
    isSessionLoading,
    isSubjectsLoading,
    isError,
    error,
  } = useDashboard();

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back to your student portal"
      />

      {isError && <DashboardError error={error} />}

      {/* Welcome Card */}
      <WelcomeCard student={student} />

      {/* Stats Grid */}
      {isSubjectsLoading ? (
        <StatsGridSkeleton />
      ) : (
        <StatsGrid
          student={student}
          totalSubjects={subjectsData?.totalSubjects ?? 0}
        />
      )}

      {/* Term Info + Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {isSessionLoading ? (
          <CurrentTermCardSkeleton />
        ) : (
          sessionControl && <CurrentTermCard sessionControl={sessionControl} />
        )}

        {isSubjectsLoading ? (
          <SubjectsListCardSkeleton />
        ) : (
          <SubjectsListCard subjects={subjectsData?.subjects ?? []} />
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data: student, isLoading, isError, error } = useMe();

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        <PageHeader
          title="Dashboard"
          description="Welcome back to your student portal"
        />
        <WelcomeCardSkeleton />
        <StatsGridSkeleton />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        <PageHeader
          title="Dashboard"
          description="Welcome back to your student portal"
        />
        <DashboardError error={error} />
      </div>
    );
  }

  if (student.org_type === StudentOrganisationType.College) {
    return <CollegeDashboard student={student} />;
  }

  return <K12Dashboard student={student} />;
};

export default Dashboard;
