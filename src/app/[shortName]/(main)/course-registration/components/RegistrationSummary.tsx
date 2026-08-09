import { BookOpen, CalendarDays, Gauge, Layers3 } from "lucide-react";

interface RegistrationSummaryProps {
  sessionName: string;
  semesterName: string;
  selectedCourseCount: number;
  selectedCreditUnits: number;
  maxCreditUnits: number;
}

const RegistrationSummary = ({
  sessionName,
  semesterName,
  selectedCourseCount,
  selectedCreditUnits,
  maxCreditUnits,
}: RegistrationSummaryProps) => {
  const items = [
    { label: "Session", value: sessionName, icon: CalendarDays },
    { label: "Semester", value: semesterName, icon: Layers3 },
    {
      label: "Selected courses",
      value: selectedCourseCount.toString(),
      icon: BookOpen,
    },
    {
      label: "Credit units",
      value: `${selectedCreditUnits} / ${maxCreditUnits}`,
      icon: Gauge,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
            <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="text-xs text-muted-foreground md:text-sm">{label}</p>
          <p className="mt-1 truncate text-base font-bold capitalize text-gray-900 dark:text-white md:text-lg">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RegistrationSummary;
