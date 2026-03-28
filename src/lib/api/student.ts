import { academicApiClient } from "./axios";
import type { StudentProfile, SubjectsResponse } from "@/src/types";

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
