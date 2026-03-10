"use client";

import { Download, Loader2, CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useResultDownloadStore } from "@/src/lib/stores/resultDownloadStore";

const DownloadProgressBanner = () => {
  const { downloadStatus, progress, fileUrl, error, reset } =
    useResultDownloadStore();

  if (downloadStatus === "idle") return null;

  const isRequesting = downloadStatus === "requesting";
  const isPolling = downloadStatus === "polling";
  const isCompleted = downloadStatus === "completed";
  const isFailed = downloadStatus === "failed";

  return (
    <div
      className={cn(
        "w-full px-4 py-2 flex items-center gap-3 text-sm transition-all duration-300",
        isCompleted && "bg-green-600 dark:bg-green-700 text-white",
        (isRequesting || isPolling) &&
          "bg-blue-600 dark:bg-blue-700 text-white",
        isFailed && "bg-red-600 dark:bg-red-700 text-white",
      )}
    >
      {/* Icon */}
      <div className="shrink-0">
        {isCompleted && <CheckCircle className="w-4 h-4" />}
        {isFailed && <XCircle className="w-4 h-4" />}
        {(isRequesting || isPolling) && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        {isRequesting && <span>Initiating PDF generation…</span>}
        {isPolling && <span>Generating result PDF — {progress}% complete</span>}
        {isCompleted && <span>Your result PDF is ready!</span>}
        {isFailed && (
          <span>PDF generation failed: {error ?? "Unknown error"}</span>
        )}
      </div>

      {/* Progress bar (polling only) */}
      {isPolling && (
        <div className="hidden sm:block w-32 bg-blue-400/40 rounded-full h-1.5 shrink-0">
          <div
            className="bg-white rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Download button (completed) */}
      {isCompleted && fileUrl && (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex items-center gap-1.5 bg-white text-green-700 font-medium px-3 py-1 rounded-lg text-xs hover:bg-green-50 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      )}

      {/* Close */}
      {(isCompleted || isFailed) && (
        <button
          onClick={reset}
          className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default DownloadProgressBanner;
