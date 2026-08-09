import type {
  SessionControl,
  SessionControlSession,
  SessionControlTerm,
} from "@/src/types";

import { academicApiClient } from "./config";

export const getCurrentSession = async (
  organisationId: string,
): Promise<SessionControl> => {
  const { data } = await academicApiClient.get<SessionControl>(
    `/session-control/current/${organisationId}`,
  );
  return data;
};

export const getSessions = async (
  organisationId: string,
): Promise<SessionControlSession[]> => {
  const { data } = await academicApiClient.get<SessionControlSession[]>(
    `/sessions/organisation/${organisationId}`,
  );

  return data;
};

export const getTerms = async (
  organisationId: string,
): Promise<SessionControlTerm[]> => {
  const { data } = await academicApiClient.get<SessionControlTerm[]>(
    `/terms/organisation/${organisationId}`,
  );

  return data;
};
