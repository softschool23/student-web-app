import { useQuery } from "@tanstack/react-query";
import {
  getCurrentSession,
  getSessions,
  getTerms,
} from "@/src/network/session";

export const sessionQueryKeys = {
  all: ["session"] as const,
  current: (organisationId: string) =>
    [...sessionQueryKeys.all, "current", organisationId] as const,
  lists: () => [...sessionQueryKeys.all, "list"] as const,
  list: (organisationId: string) =>
    [...sessionQueryKeys.lists(), organisationId] as const,
  terms: (organisationId: string) =>
    [...sessionQueryKeys.all, "terms", organisationId] as const,
};

export const useCurrentSession = (organisationId: string) => {
  return useQuery({
    queryKey: sessionQueryKeys.current(organisationId),
    queryFn: () => getCurrentSession(organisationId),
    staleTime: 5 * 60 * 1000,
    enabled: !!organisationId,
  });
};

export const useSessions = (organisationId: string) =>
  useQuery({
    queryKey: sessionQueryKeys.list(organisationId),
    queryFn: () => getSessions(organisationId),
    staleTime: 5 * 60 * 1000,
    enabled: !!organisationId,
  });

export const useTerms = (organisationId: string) =>
  useQuery({
    queryKey: sessionQueryKeys.terms(organisationId),
    queryFn: () => getTerms(organisationId),
    staleTime: 5 * 60 * 1000,
    enabled: !!organisationId,
  });
