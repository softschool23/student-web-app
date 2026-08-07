import type { SessionControl } from "@/src/types";

import { academicApiClient } from "./config";

export const getCurrentSession = async (
  organisationId: string,
): Promise<SessionControl> => {
  const { data } = await academicApiClient.get<SessionControl>(
    `/session-control/current/${organisationId}`,
  );
  return data;
};
