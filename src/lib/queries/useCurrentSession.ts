import { useQuery } from "@tanstack/react-query";
import { getCurrentSession } from "@/src/lib/api/session";

export const sessionQueryKeys = {
  current: (organisationId: string) =>
    ["session", "current", organisationId] as const,
};

export const useCurrentSession = (organisationId: string) => {
  return useQuery({
    queryKey: sessionQueryKeys.current(organisationId),
    queryFn: () => getCurrentSession(organisationId),
    staleTime: 5 * 60 * 1000,
    enabled: !!organisationId,
  });
};
