import { academicApiClient } from "./axios";
import type { StudentProfile } from "@/src/types";

export const getMe = async (): Promise<StudentProfile> => {
  const { data } =
    await academicApiClient.get<StudentProfile>("/student-portal/me");
  return data;
};
