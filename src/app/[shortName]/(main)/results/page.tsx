"use client";

import { PageHeader } from "@/src/components";
import { useResults } from "./hooks/useResults";
import ResultSummaryCard from "./components/ResultSummaryCard";
import ResultSubjectsTable from "./components/ResultSubjectsTable";
import ResultComments from "./components/ResultComments";
import ResultPreviewSkeleton from "./components/ResultPreviewSkeleton";
import NoResultState from "./components/NoResultState";
import DownloadResultButton from "./components/DownloadResultButton";
import { AlertCircle } from "lucide-react";

const ResultsPage = () => {
  const {
    result,
    isLoading,
    isError,
    resultErrorMessage,
    resultStatusCode,
    handleDownload,
  } = useResults();

  const renderContent = () => {
    if (isLoading) {
      return <ResultPreviewSkeleton />;
    }

    if (isError) {
      const isForbidden = resultStatusCode === 403;
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            {isForbidden ? "Results Disabled" : "Failed to load results"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            {isForbidden
              ? (resultErrorMessage ??
                "Results have been disabled by the school administrator. Please contact your administrator.")
              : "An error occurred while fetching your results. Please try again."}
          </p>
        </div>
      );
    }

    if (!result || !result.hasResult) {
      return <NoResultState />;
    }

    return (
      <div className="space-y-6">
        <ResultSummaryCard result={result} />
        <ResultSubjectsTable subjects={result.subjects} />
        <ResultComments comments={result.comments} />
        <div className="flex justify-end">
          <DownloadResultButton onDownload={handleDownload} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results"
        description="View and download your academic results"
      />
      {renderContent()}
    </div>
  );
};

export default ResultsPage;
