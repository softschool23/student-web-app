import { academicApiClient } from "./axios";
import type { AssignmentsResponse, AssignmentParams } from "@/src/types";

export const getAssignments = async (
  params: AssignmentParams,
): Promise<AssignmentsResponse> => {
  const { data } = await academicApiClient.get<AssignmentsResponse>(
    "/student-portal/assignments",
    { params },
  );
  return data;
};
