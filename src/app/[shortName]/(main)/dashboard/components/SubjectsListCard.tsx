import { BookOpen } from "lucide-react";
import type { StudentSubjectItem } from "@/src/types";

interface SubjectsListCardProps {
  subjects: StudentSubjectItem[];
}

const SubjectsListCard = ({ subjects }: SubjectsListCardProps) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-4 md:mb-5">
      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
        My Subjects
      </h3>
    </div>

    {subjects.length > 0 ? (
      <div className="space-y-2">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="text-sm md:text-base text-gray-900 dark:text-white capitalize">
              {subject.name}
            </span>
            <div className="flex items-center gap-2">
              {subject.code && (
                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                  {subject.code}
                </span>
              )}
              {subject.isCompulsory && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  Compulsory
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
        No subjects assigned
      </p>
    )}
  </div>
);

export default SubjectsListCard;
