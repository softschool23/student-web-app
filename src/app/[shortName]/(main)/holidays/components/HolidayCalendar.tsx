"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { HolidayItem } from "@/src/types";

interface HolidayCalendarProps {
  holidays: HolidayItem[];
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HolidayCalendar = ({ holidays }: HolidayCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const previousMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const daysInMonth = currentDate.daysInMonth();
  const firstDay = currentDate.startOf("month").day();

  const isHoliday = (day: number) => {
    const checkDate = currentDate.date(day).startOf("day");
    return holidays.some((h) => {
      const start = dayjs(h.startDate).startOf("day");
      const end = dayjs(h.endDate).startOf("day");
      return (
        (checkDate.isAfter(start) || checkDate.isSame(start)) &&
        (checkDate.isBefore(end) || checkDate.isSame(end))
      );
    });
  };

  const isToday = (day: number) => currentDate.date(day).isSame(dayjs(), "day");

  const calendarDays: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
          {currentDate.format("MMMM YYYY")}
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

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
          >
            {d}
          </div>
        ))}

        {calendarDays.map((day, idx) => {
          if (day === null)
            return <div key={`empty-${idx}`} className="aspect-square" />;

          const hol = isHoliday(day);
          const tod = isToday(day);

          return (
            <div
              key={day}
              className={cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm md:text-base transition-colors",
                hol &&
                  "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold",
                tod &&
                  !hol &&
                  "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold",
                !hol &&
                  !tod &&
                  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
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
  );
};

export default HolidayCalendar;
