import { BookOpen, Users, Layers } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { StudentProfile } from "@/src/types";

interface StatsGridProps {
  student: StudentProfile;
}

const StatsGrid = ({ student }: StatsGridProps) => {
  const stats = [
    {
      label: "Class",
      value: student.class?.name ?? "—",
      icon: Users,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Section",
      value: student.section?.name ?? "—",
      icon: Layers,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Subjects",
      value: (student.subjects?.length ?? 0).toString(),
      icon: BookOpen,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate capitalize">
                  {stat.value}
                </h3>
              </div>
              <div className={cn("p-3 rounded-lg shrink-0 ml-3", stat.bgColor)}>
                <Icon className={cn("w-5 h-5 md:w-6 md:h-6", stat.iconColor)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
