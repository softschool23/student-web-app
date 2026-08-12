import {
  getCurrentSession,
  getSessions,
  getTerms,
} from "@/src/network/session";
import { useStudentQuery } from "@/src/lib/queries/useStudentQuery";

export const sessionQueryKeys = {
  all: ["session"] as const,
  current: ["session", "current"] as const,
  list: ["session", "list"] as const,
  terms: ["session", "terms"] as const,
};

export const useCurrentSession = () => {
  return useStudentQuery({
    identifiers: ["organisationId"],
    queryKey: sessionQueryKeys.current,
    queryFn: ({ organisationId }) => getCurrentSession(organisationId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSessions = () =>
  useStudentQuery({
    identifiers: ["organisationId"],
    queryKey: sessionQueryKeys.list,
    queryFn: ({ organisationId }) => getSessions(organisationId),
    staleTime: 5 * 60 * 1000,
  });

export const useTerms = () =>
  useStudentQuery({
    identifiers: ["organisationId"],
    queryKey: sessionQueryKeys.terms,
    queryFn: ({ organisationId }) => getTerms(organisationId),
    staleTime: 5 * 60 * 1000,
  });
