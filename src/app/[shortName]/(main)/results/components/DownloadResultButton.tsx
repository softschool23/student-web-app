"use client";

import { Download, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useResultDownloadStore } from "@/src/lib/stores/resultDownloadStore";

interface DownloadResultButtonProps {
  onDownload: () => void;
}

const DownloadResultButton = ({ onDownload }: DownloadResultButtonProps) => {
  const { downloadStatus } = useResultDownloadStore();

  const isLoading =
    downloadStatus === "requesting" || downloadStatus === "polling";

  return (
    <button
      onClick={onDownload}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "disabled:opacity-60 disabled:cursor-not-allowed",
      )}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {isLoading ? "Generating PDF…" : "Download Result (PDF)"}
    </button>
  );
};

export default DownloadResultButton;
