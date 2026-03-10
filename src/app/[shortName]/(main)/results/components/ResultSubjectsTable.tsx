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

const ResultSubjectsTable = ({ subjects }: ResultSubjectsTableProps) => {
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
              <th className="px-4 md:px-6 py-3 font-medium text-gray-600 dark:text-gray-400">
                Subject
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 text-center">
                1st CA
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 text-center">
                2nd CA
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 text-center">
                Exam
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 text-center">
                Total
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 text-center">
                Grade
              </th>
              <th className="px-4 md:px-6 py-3 font-medium text-gray-600 dark:text-gray-400">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {subjects.map((subject) => (
              <tr
                key={subject.subjectId}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 md:px-6 py-3 font-medium text-gray-900 dark:text-white">
                  <div>
                    <p>{subject.subjectName}</p>
                    {subject.subjectCode && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {subject.subjectCode}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-center">
                  {subject.firstCA}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-center">
                  {subject.secondCA}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-center">
                  {subject.exam}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-center font-semibold">
                  {subject.total}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold",
                      gradeColor(subject.grade),
                    )}
                  >
                    {subject.grade}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 text-gray-600 dark:text-gray-400 text-sm">
                  {subject.remarks}
                </td>
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
                  {subject.subjectName}
                </p>
                {subject.subjectCode && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subject.subjectCode}
                  </p>
                )}
              </div>
              <span
                className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold",
                  gradeColor(subject.grade),
                )}
              >
                {subject.grade}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {[
                { label: "1st CA", value: subject.firstCA },
                { label: "2nd CA", value: subject.secondCA },
                { label: "Exam", value: subject.exam },
                { label: "Total", value: subject.total },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="text-center bg-gray-50 dark:bg-gray-800 rounded p-1.5"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Remarks:{" "}
              <span className="text-gray-700 dark:text-gray-300">
                {subject.remarks}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultSubjectsTable;
