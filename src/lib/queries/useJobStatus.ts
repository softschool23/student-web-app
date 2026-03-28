import { useQuery } from "@tanstack/react-query";
import { getPdfJobStatus } from "@/src/lib/api/results";
import type { PdfJobStatus } from "@/src/types";

export const jobStatusQueryKeys = {
  status: (jobId: string) => ["pdf-job", "status", jobId] as const,
};

export const useJobStatus = (jobId: string | null) => {
  return useQuery({
    queryKey: jobStatusQueryKeys.status(jobId ?? ""),
    queryFn: () => getPdfJobStatus(jobId!),
    enabled: !!jobId,
    staleTime: 0,
    retry: false,
    refetchInterval: (query) => {
      const data = query.state.data as PdfJobStatus | undefined;
      if (data?.status === "completed" || data?.status === "failed") {
        return false;
      }
      return 2000; // poll every 2 seconds
    },
  });
};
