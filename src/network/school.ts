import type { SchoolBasicInfo, StudentPortalSchool } from "@/src/types";

import { academicApiClient, authApiClient } from "./config";

export const fetchSchoolBasicInfo = async (
  shortName: string,
): Promise<SchoolBasicInfo> => {
  const { data } = await authApiClient.get<SchoolBasicInfo>(
    `/organisations/${shortName}/basic-info`,
  );
  return data;
};

export const getStudentPortalSchool = async (): Promise<StudentPortalSchool> => {
  const { data } = await academicApiClient.get<StudentPortalSchool>(
    "/student-portal/school",
  );

  return data;
};
