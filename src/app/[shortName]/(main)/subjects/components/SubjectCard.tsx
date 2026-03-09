import { BookOpen, Mail, Phone } from "lucide-react";
import type { SubjectItem } from "@/src/types";

interface SubjectCardProps {
  subject: SubjectItem;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-white truncate">
              {subject.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {subject.code && (
                <span className="text-sm text-primary-100">{subject.code}</span>
              )}
              {subject.isCompulsory && (
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                  Compulsory
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Information */}
      <div className="p-4 md:p-6">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
          Subject Teacher
        </h4>

        {subject.teacher ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm md:text-base shrink-0">
                {subject.teacher.firstName[0]}
                {subject.teacher.lastName[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                  {subject.teacher.firstName} {subject.teacher.lastName}
                </p>
              </div>
            </div>

            {(subject.teacher.email || subject.teacher.phoneNumber) && (
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                {subject.teacher.email && (
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate">{subject.teacher.email}</span>
                  </div>
                )}
                {subject.teacher.phoneNumber && (
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>{subject.teacher.phoneNumber}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">
            No teacher assigned
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
