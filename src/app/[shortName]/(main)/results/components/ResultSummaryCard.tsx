import { Award, BarChart2, Users, BookOpen, Hash } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { ResultPreview } from "@/src/types";

interface ResultSummaryCardProps {
  result: ResultPreview;
}

const ResultSummaryCard = ({ result }: ResultSummaryCardProps) => {
  const { summary, student, class: cls, section } = result;

  const stats = [
    {
      label: "Total Score",
      value: summary.totalScore.toString(),
      icon: BarChart2,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Average Score",
      value: `${summary.averageScore.toFixed(1)}%`,
      icon: Award,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "Position",
      value: `${summary.position} / ${summary.totalStudents}`,
      icon: Users,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Subjects",
      value: summary.subjectsCount.toString(),
      icon: BookOpen,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
      {/* Student Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white capitalize">
            {student.firstName} {student.middleName} {student.lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
            <Hash className="w-3 h-3" />
            {student.studentNumber}
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
          <p>
            <span className="font-medium">Class:</span> {cls.name}
          </p>
          <p>
            <span className="font-medium">Section:</span> {section.name}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-lg border border-gray-100 dark:border-gray-800 p-3 md:p-4"
            >
              <div className={cn("w-fit rounded-lg p-2", stat.bgColor)}>
                <Icon className={cn("w-4 h-4", stat.iconColor)} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {result.nextTermBegins && (
        <p className="text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
          <span className="font-medium">Next Term Begins:</span>{" "}
          {result.nextTermBegins}
        </p>
      )}
    </div>
  );
};

export default ResultSummaryCard;
