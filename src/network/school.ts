import type { SchoolBasicInfo } from "@/src/types";

import { authApiClient } from "./config";

export const fetchSchoolBasicInfo = async (
  shortName: string,
): Promise<SchoolBasicInfo> => {
  const { data } = await authApiClient.get<SchoolBasicInfo>(
    `/organisations/${shortName}/basic-info`,
  );
  return data;
};
