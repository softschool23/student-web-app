import axios from "axios";

import type {
  AvailableCoursesParams,
  AvailableCoursesResponse,
  SaveCourseRegistrationDraftPayload,
  StudentCourseRegistrationResponse,
} from "@/src/types";

import { academicApiClient } from "./config";

export const getAvailableCourses = async (
  params: AvailableCoursesParams,
): Promise<AvailableCoursesResponse> => {
  const { data } = await academicApiClient.get<AvailableCoursesResponse>(
    "/college/course-registrations/available-courses",
    { params },
  );

  return data;
};

export const getCourseRegistration = async (
  params: AvailableCoursesParams,
): Promise<StudentCourseRegistrationResponse | null> => {
  try {
    const { data } =
      await academicApiClient.get<StudentCourseRegistrationResponse>(
        "/student-portal/subjects",
        { params },
      );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};

export const saveCourseRegistrationDraft = async (
  payload: SaveCourseRegistrationDraftPayload,
): Promise<void> => {
  await academicApiClient.post(
    "/college/course-registrations/draft",
    payload,
  );
};

export const submitCourseRegistration = async (
  draftId: string,
): Promise<void> => {
  await academicApiClient.post(
    `/college/course-registrations/${draftId}/submit`,
  );
};
