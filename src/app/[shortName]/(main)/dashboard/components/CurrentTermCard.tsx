import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import type { SessionControl } from "@/src/types";

interface CurrentTermCardProps {
  sessionControl: SessionControl;
}

const CurrentTermCard = ({ sessionControl }: CurrentTermCardProps) => {
  const { currentTerm, currentSession } = sessionControl;

  const start = dayjs(currentTerm.startDate).format("MMM D, YYYY");
  const end = dayjs(currentTerm.endDate).format("MMM D, YYYY");
  const nextTerm = dayjs(currentTerm.nextTermBegins).format("MMM D, YYYY");

  const rows: { label: string; value: string }[] = [
    { label: "Session", value: currentSession.name },
    { label: "Term", value: currentTerm.name },
    { label: "Start Date", value: start },
    { label: "End Date", value: end },
    { label: "Next Term Begins", value: nextTerm },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4 md:mb-5">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
          Current Term Information
        </h3>
      </div>

      <div className="space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {label}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base capitalize">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentTermCard;
