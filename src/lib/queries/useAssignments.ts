import { useQuery } from "@tanstack/react-query";
import { useSchool } from "@/src/lib/context/SchoolContext";
import { useCurrentSession } from "@/src/lib/queries/useCurrentSession";
import { getAssignments } from "@/src/lib/api/assignments";
import type { AssignmentParams } from "@/src/types";

export const assignmentQueryKeys = {
  list: (params: AssignmentParams) => ["assignments", "list", params] as const,
};

export const useAssignments = (
  filters: Pick<AssignmentParams, "search" | "subjectId"> = {},
) => {
  const { school } = useSchool();

  const { data: sessionControl, isLoading: isSessionLoading } =
    useCurrentSession(school._id);

  const termId = sessionControl?.currentTerm?._id ?? "";
  const sessionId = sessionControl?.currentSession?._id ?? "";

  const params: AssignmentParams = {
    termId: termId || undefined,
    sessionId: sessionId || undefined,
    search: filters.search || undefined,
    subjectId: filters.subjectId || undefined,
  };

  const query = useQuery({
    queryKey: assignmentQueryKeys.list(params),
    queryFn: () => getAssignments(params),
    enabled: !!termId && !!sessionId,
    staleTime: 1000 * 60 * 5,
  });

  return { ...query, isSessionLoading };
};
