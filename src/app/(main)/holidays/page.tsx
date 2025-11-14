"use client";

import React, { useState } from "react";
import { PageHeader } from "@/src/components";
import { holidays } from "@/src/lib/dummyData";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const HolidaysPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get upcoming holidays (today and future)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingHolidays = holidays.filter(
    (holiday) => holiday.startDate >= today
  );

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isHoliday = (day: number) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    checkDate.setHours(0, 0, 0, 0);

    return holidays.some((holiday) => {
      const start = new Date(holiday.startDate);
      const end = new Date(holiday.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return checkDate >= start && checkDate <= end;
    });
  };

  const isToday = (day: number) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const end = endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (start === end) {
      return start;
    }
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Holidays & Calendar"
        description="View upcoming holidays and academic calendar"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Calendar View */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              {monthName} {year}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {/* Day Names */}
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const isHol = isHoliday(day);
              const isTod = isToday(day);

              return (
                <div
                  key={day}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-lg text-sm md:text-base transition-colors",
                    isHol &&
                      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold",
                    isTod &&
                      !isHol &&
                      "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold",
                    !isHol &&
                      !isTod &&
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 md:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30" />
              <span className="text-gray-600 dark:text-gray-400">Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary-100 dark:bg-primary-900/30" />
              <span className="text-gray-600 dark:text-gray-400">Today</span>
            </div>
          </div>
        </div>

        {/* Upcoming Holidays List */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Upcoming Holidays
          </h3>

          <div className="space-y-3 md:space-y-4">
            {upcomingHolidays.length > 0 ? (
              upcomingHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-red-500"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg shrink-0">
                      <CalendarIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base mb-1">
                        {holiday.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {formatDateRange(holiday.startDate, holiday.endDate)}
                      </p>
                      {holiday.description && (
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
                          {holiday.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming holidays</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidaysPage;
