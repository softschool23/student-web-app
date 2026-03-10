import { FileX } from "lucide-react";

const NoResultState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
        <FileX className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No Result Available
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        Your result for the current term has not been published yet. Please
        check back later.
      </p>
    </div>
  );
};

export default NoResultState;
