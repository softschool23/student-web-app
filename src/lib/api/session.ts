import { academicApiClient } from "./axios";
import type { SessionControl } from "@/src/types";

export const getCurrentSession = async (
  organisationId: string,
): Promise<SessionControl> => {
  const { data } = await academicApiClient.get<SessionControl>(
    `/session-control/current/${organisationId}`,
  );
  return data;
};
