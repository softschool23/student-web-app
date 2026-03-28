import { useQuery } from "@tanstack/react-query";
import { getResultPreview } from "@/src/lib/api/results";

export const resultQueryKeys = {
  preview: (termId: string, sessionId: string) =>
    ["result", "preview", termId, sessionId] as const,
};

export const useResultPreview = (termId: string, sessionId: string) => {
  return useQuery({
    queryKey: resultQueryKeys.preview(termId, sessionId),
    queryFn: () => getResultPreview(termId, sessionId),
    enabled: !!termId && !!sessionId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
