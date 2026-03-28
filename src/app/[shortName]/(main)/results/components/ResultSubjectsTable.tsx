import { cn } from "@/src/lib/utils";
import type { ResultSubject } from "@/src/types";

interface ResultSubjectsTableProps {
  subjects: ResultSubject[];
}

const gradeColor = (grade: string) => {
  switch (grade) {
    case "A":
    case "A+":
      return "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    case "B":
    case "B+":
      return "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    case "C":
    case "C+":
      return "text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
    case "D":
      return "text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20";
    default:
      return "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
  }
};

const formatKey = (key: string): string =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const capitalizeValue = (value: unknown): string => {
  if (value === null || value === undefined) return "-";
  const str = String(value);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const MOBILE_EXCLUDED_KEYS = new Set([
  "subjectId",
  "subjectName",
  "subjectCode",
  "grade",
  "remarks",
]);

const ResultSubjectsTable = ({ subjects }: ResultSubjectsTableProps) => {
  if (!subjects.length) return null;

  const columns = (Object.keys(subjects[0]) as (keyof ResultSubject)[]).filter(
    (col) => col !== "subjectId",
  );
  const mobileScoreColumns = columns.filter(
    (col) => !MOBILE_EXCLUDED_KEYS.has(col),
  );
  const gridColsClass =
    mobileScoreColumns.length <= 2
      ? "grid-cols-2"
      : mobileScoreColumns.length === 3
        ? "grid-cols-3"
        : "grid-cols-4";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Subject Results
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 text-left">
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={cn(
                    "py-3 font-medium text-gray-600 dark:text-gray-400",
                    index === 0 || index === columns.length - 1
                      ? "px-6"
                      : "px-4 text-center",
                  )}
                >
                  {formatKey(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {subjects.map((subject) => (
              <tr
                key={subject.subjectId}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {columns.map((col, index) => {
                  const value = subject[col];
                  if (col === "grade") {
                    return (
                      <td key={col} className="px-4 py-3 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold",
                            gradeColor(String(value)),
                          )}
                        >
                          {capitalizeValue(value)}
                        </span>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={col}
                      className={cn(
                        "py-3 text-gray-700 dark:text-gray-300",
                        index === 0
                          ? "px-6 font-medium text-gray-900 dark:text-white"
                          : index === columns.length - 1
                            ? "px-6"
                            : "px-4 text-center",
                      )}
                    >
                      {capitalizeValue(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
        {subjects.map((subject) => (
          <div key={subject.subjectId} className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {capitalizeValue(subject.subjectName)}
                </p>
                {subject.subjectCode && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {capitalizeValue(subject.subjectCode)}
                  </p>
                )}
              </div>
              <span
                className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold",
                  gradeColor(subject.grade),
                )}
              >
                {capitalizeValue(subject.grade)}
              </span>
            </div>
            <div className={cn("grid gap-2 text-sm", gridColsClass)}>
              {mobileScoreColumns.map((col) => (
                <div
                  key={col}
                  className="text-center bg-gray-50 dark:bg-gray-800 rounded p-1.5"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatKey(col)}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {capitalizeValue(subject[col])}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Remarks:{" "}
              <span className="text-gray-700 dark:text-gray-300">
                {capitalizeValue(subject.remarks)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultSubjectsTable;
