import { useStudentQuery } from "@/src/lib/queries/useStudentQuery";
import { getResultPreview } from "@/src/network/results";

export const resultQueryKeys = {
  preview: (termId: string, sessionId: string) =>
    ["result", "preview", termId, sessionId] as const,
};

export const useResultPreview = (termId: string, sessionId: string) => {
  return useStudentQuery({
    queryKey: resultQueryKeys.preview(termId, sessionId),
    queryFn: () => getResultPreview(termId, sessionId),
    enabled: !!termId && !!sessionId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
