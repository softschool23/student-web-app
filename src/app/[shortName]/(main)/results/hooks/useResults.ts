"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSchool } from "@/src/lib/context/SchoolContext";
import { useCurrentSession } from "@/src/lib/queries/useCurrentSession";
import { useResultPreview } from "@/src/lib/queries/useResultPreview";
import { useJobStatus } from "@/src/lib/queries/useJobStatus";
import { useResultDownloadStore } from "@/src/lib/stores/resultDownloadStore";
import { triggerResultDownload } from "@/src/lib/api/results";

export const useResults = () => {
  const { school } = useSchool();

  // ── Session / Term ──────────────────────────────────────────────────────────
  const {
    data: sessionControl,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useCurrentSession(school._id);

  const termId = sessionControl?.currentTerm?._id ?? "";
  const sessionId = sessionControl?.currentSession?._id ?? "";

  // ── Result Preview ──────────────────────────────────────────────────────────
  const {
    data: result,
    isLoading: isResultLoading,
    isError: isResultError,
    error: resultError,
    refetch: refetchResult,
  } = useResultPreview(termId, sessionId);

  const resultErrorMessage =
    resultError instanceof AxiosError
      ? (resultError.response?.data?.message ?? resultError.message)
      : null;
  const resultStatusCode =
    resultError instanceof AxiosError
      ? (resultError.response?.data?.statusCode ?? resultError.response?.status)
      : null;

  // ── Download State (Zustand) ────────────────────────────────────────────────
  const {
    jobId,
    downloadStatus,
    progress,
    fileUrl,
    error: downloadError,
    startDownload,
    setProgress,
    setCompleted,
    setFailed,
    setRequesting,
  } = useResultDownloadStore();

  // ── Job Status Polling ──────────────────────────────────────────────────────
  const { data: jobStatus } = useJobStatus(
    downloadStatus === "polling" ? jobId : null,
  );

  // Sync job status into Zustand
  useEffect(() => {
    if (!jobStatus) return;

    if (jobStatus.status === "completed" && jobStatus.fileUrl) {
      setCompleted(jobStatus.fileUrl);
    } else if (jobStatus.status === "failed") {
      setFailed("PDF generation failed. Please try again.");
    } else {
      setProgress(jobStatus.progress ?? 0);
    }
  }, [jobStatus, setCompleted, setFailed, setProgress]);

  // ── Download Trigger Mutation ────────────────────────────────────────────────
  const downloadMutation = useMutation({
    mutationFn: () => triggerResultDownload(termId, sessionId),
    onMutate: () => {
      setRequesting();
    },
    onSuccess: (data) => {
      startDownload(data.pdfJobId);
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to start download";
      setFailed(message);
    },
  });

  const handleDownload = () => {
    if (
      downloadStatus === "idle" ||
      downloadStatus === "failed" ||
      downloadStatus === "completed"
    ) {
      downloadMutation.mutate();
    }
  };

  return {
    // Data
    result,
    sessionControl,
    termId,
    sessionId,

    // Loading / Error states
    isLoading: isSessionLoading || isResultLoading,
    isSessionLoading,
    isResultLoading,
    isError: isSessionError || isResultError,
    resultError,
    resultErrorMessage,
    resultStatusCode,

    // Download
    handleDownload,
    downloadStatus,
    progress,
    fileUrl,
    downloadError,

    // Helpers
    refetchResult,
  };
};
