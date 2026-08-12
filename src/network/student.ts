import type {
  StudentProfile,
  SubjectsResponse,
  UpdateCollegeStudentProfilePayload,
} from "@/src/types";

import { academicApiClient } from "./config";

export const getMe = async (): Promise<StudentProfile> => {
  const { data } =
    await academicApiClient.get<StudentProfile>("/student-portal/me");
  return data;
};

export const getSubjects = async (): Promise<SubjectsResponse> => {
  const { data } = await academicApiClient.get<SubjectsResponse>(
    "/student-portal/subjects",
  );
  return data;
};

export const updateCollegeStudentProfile = async (
  studentId: string,
  payload: UpdateCollegeStudentProfilePayload,
): Promise<void> => {
  await academicApiClient.patch(`/student-portal/${studentId}`, payload);
};
