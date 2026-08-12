import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  useStudentIdentifiers,
  useStudentQuery,
} from "@/src/lib/queries/useStudentQuery";
import {
  getAvailableCourses,
  getCourseRegistration,
  saveCourseRegistrationDraft,
  submitCourseRegistration,
} from "@/src/network/courseRegistrations";
import type {
  CourseRegistrationPeriodParams,
  SaveCourseRegistrationDraftInput,
} from "@/src/types";

export const courseRegistrationQueryKeys = {
  all: ["college", "course-registrations"] as const,
  availableCourses: (params?: CourseRegistrationPeriodParams) =>
    [...courseRegistrationQueryKeys.all, "available-courses", params] as const,
  registration: (params?: CourseRegistrationPeriodParams) =>
    [...courseRegistrationQueryKeys.all, "registration", params] as const,
};

export const useCourseRegistration = (
  params?: CourseRegistrationPeriodParams,
) =>
  useStudentQuery({
    identifiers: ["organisationId", "studentId"],
    queryKey: courseRegistrationQueryKeys.registration(params),
    queryFn: (identifiers) => {
      if (!params) {
        throw new Error("Course registration parameters are unavailable");
      }

      return getCourseRegistration({ ...identifiers, ...params });
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });

export const useAvailableCourses = (
  params?: CourseRegistrationPeriodParams,
) =>
  useStudentQuery({
    identifiers: ["organisationId", "studentId"],
    queryKey: courseRegistrationQueryKeys.availableCourses(params),
    queryFn: (identifiers) => {
      if (!params) {
        throw new Error("Course registration parameters are unavailable");
      }

      return getAvailableCourses({ ...identifiers, ...params });
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });

const getMutationErrorMessage = (error: unknown): string =>
  (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message ?? "Failed to save course selection. Please try again.";

export const useSaveCourseRegistrationDraft = () => {
  const queryClient = useQueryClient();
  const identifiers = useStudentIdentifiers([
    "organisationId",
    "studentId",
  ]);

  return useMutation({
    mutationFn: (payload: SaveCourseRegistrationDraftInput) => {
      if (!identifiers.organisationId || !identifiers.studentId) {
        throw new Error("Student information is unavailable");
      }

      return saveCourseRegistrationDraft({ ...identifiers, ...payload });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: courseRegistrationQueryKeys.all,
      });
      toast.success("Course selection saved as draft.");
    },
    onError: (error) => {
      toast.error(getMutationErrorMessage(error));
    },
  });
};

export const useSubmitCourseRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draftId: string) => submitCourseRegistration(draftId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: courseRegistrationQueryKeys.all,
      });
      toast.success("Course registration submitted successfully.");
    },
    onError: (error) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ??
        "Failed to submit course registration. Please try again.";
      toast.error(message);
    },
  });
};
