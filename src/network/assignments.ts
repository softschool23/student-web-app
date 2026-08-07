import type { AssignmentsResponse, AssignmentParams } from "@/src/types";

import { academicApiClient } from "./config";

export const getAssignments = async (
  params: AssignmentParams,
): Promise<AssignmentsResponse> => {
  const { data } = await academicApiClient.get<AssignmentsResponse>(
    "/student-portal/assignments",
    { params },
  );
  return data;
};
