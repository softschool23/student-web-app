import { create } from "zustand";

export type DownloadStatus =
  | "idle"
  | "requesting"
  | "polling"
  | "completed"
  | "failed";

interface ResultDownloadState {
  jobId: string | null;
  downloadStatus: DownloadStatus;
  progress: number;
  fileUrl: string | null;
  error: string | null;
  // Actions
  startDownload: (jobId: string) => void;
  setProgress: (progress: number) => void;
  setCompleted: (fileUrl: string) => void;
  setFailed: (error: string) => void;
  setRequesting: () => void;
  reset: () => void;
}

export const useResultDownloadStore = create<ResultDownloadState>((set) => ({
  jobId: null,
  downloadStatus: "idle",
  progress: 0,
  fileUrl: null,
  error: null,

  startDownload: (jobId) =>
    set({
      jobId,
      downloadStatus: "polling",
      progress: 0,
      fileUrl: null,
      error: null,
    }),

  setProgress: (progress) => set({ progress }),

  setCompleted: (fileUrl) =>
    set({ downloadStatus: "completed", progress: 100, fileUrl }),

  setFailed: (error) => set({ downloadStatus: "failed", error }),

  setRequesting: () =>
    set({
      downloadStatus: "requesting",
      progress: 0,
      fileUrl: null,
      error: null,
      jobId: null,
    }),

  reset: () =>
    set({
      jobId: null,
      downloadStatus: "idle",
      progress: 0,
      fileUrl: null,
      error: null,
    }),
}));
