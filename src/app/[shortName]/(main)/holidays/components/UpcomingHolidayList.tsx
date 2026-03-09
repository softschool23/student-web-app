import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";
import type { HolidayItem } from "@/src/types";

interface UpcomingHolidayListProps {
  holidays: HolidayItem[];
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = dayjs(startDate).format("MMM D, YYYY");
  const end = dayjs(endDate).format("MMM D, YYYY");
  return start === end ? start : `${start} – ${end}`;
};

const getDuration = (startDate: string, endDate: string) => {
  const days = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
  return days === 1 ? "1 day" : `${days} days`;
};

const UpcomingHolidayList = ({ holidays }: UpcomingHolidayListProps) => {
  const today = dayjs().startOf("day");

  const upcoming = holidays
    .filter((h) => !dayjs(h.endDate).isBefore(today, "day"))
    .sort(
      (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf(),
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
        Upcoming Holidays
      </h3>

      <div className="space-y-3 md:space-y-4">
        {upcoming.length > 0 ? (
          upcoming.map((holiday) => (
            <div
              key={holiday._id}
              className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-red-500"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg shrink-0">
                  <CalendarIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base capitalize">
                      {holiday.name}
                    </h4>
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full shrink-0">
                      {getDuration(holiday.startDate, holiday.endDate)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatDateRange(holiday.startDate, holiday.endDate)}
                  </p>
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
  );
};

export default UpcomingHolidayList;
