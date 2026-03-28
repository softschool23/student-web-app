import { MessageSquare } from "lucide-react";
import type { ResultPreview } from "@/src/types";

interface ResultCommentsProps {
  comments: ResultPreview["comments"];
}

const ResultComments = ({ comments }: ResultCommentsProps) => {
  const hasComments = comments.classTeacherComment || comments.principalComment;

  if (!hasComments) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Comments
        </h3>
      </div>

      <div className="space-y-4">
        {comments.classTeacherComment && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Class Teacher
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              {comments.classTeacherComment}
            </p>
          </div>
        )}

        {comments.principalComment && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Principal
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              {comments.principalComment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultComments;
