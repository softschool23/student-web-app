"use client";

import dayjs from "dayjs";
import { AlertCircle, CalendarDays } from "lucide-react";
import { PageHeader } from "@/src/components";
import { useSchool } from "@/src/lib/context/SchoolContext";
import { useHolidays } from "@/src/lib/queries/useHolidays";
import HolidayCalendar from "./components/HolidayCalendar";
import HolidayCalendarSkeleton from "./components/HolidayCalendarSkeleton";
import UpcomingHolidayList from "./components/UpcomingHolidayList";
import UpcomingHolidayListSkeleton from "./components/UpcomingHolidayListSkeleton";

const HolidaysPage = () => {
  const { school } = useSchool();
  const { data: holidays, isLoading, isError, error } = useHolidays(school._id);

  const today = dayjs().startOf("day");

  const upcomingCount =
    holidays?.filter((h) => !dayjs(h.endDate).isBefore(today, "day")).length ??
    0;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <PageHeader
        title="Holidays"
        description="School holidays and breaks for the academic year"
      />

      {/* Summary strip */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <CalendarDays className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Holidays
            </p>
            {isLoading ? (
              <div className="h-5 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-0.5" />
            ) : (
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {holidays?.length ?? 0}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <CalendarDays className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming</p>
            {isLoading ? (
              <div className="h-5 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-0.5" />
            ) : (
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {upcomingCount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Failed to load holidays</p>
            <p className="text-sm mt-1 opacity-80">
              {(error as Error)?.message ?? "An unexpected error occurred."}
            </p>
          </div>
        </div>
      )}

      {/* Calendar and list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {isLoading ? (
          <>
            <HolidayCalendarSkeleton />
            <UpcomingHolidayListSkeleton />
          </>
        ) : (
          <>
            <HolidayCalendar holidays={holidays ?? []} />
            <UpcomingHolidayList holidays={holidays ?? []} />
          </>
        )}
      </div>
    </div>
  );
};

export default HolidaysPage;
