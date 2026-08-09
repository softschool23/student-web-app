import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAvailableCourses,
  getCourseRegistration,
  saveCourseRegistrationDraft,
  submitCourseRegistration,
} from "@/src/network/courseRegistrations";
import type {
  AvailableCoursesParams,
  SaveCourseRegistrationDraftPayload,
} from "@/src/types";

export const courseRegistrationQueryKeys = {
  all: ["college", "course-registrations"] as const,
  availableCourses: (params?: AvailableCoursesParams) =>
    [...courseRegistrationQueryKeys.all, "available-courses", params] as const,
  registration: (params?: AvailableCoursesParams) =>
    [...courseRegistrationQueryKeys.all, "registration", params] as const,
};

export const useCourseRegistration = (params?: AvailableCoursesParams) =>
  useQuery({
    queryKey: courseRegistrationQueryKeys.registration(params),
    queryFn: () => {
      if (!params) {
        throw new Error("Course registration parameters are unavailable");
      }

      return getCourseRegistration(params);
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });

export const useAvailableCourses = (params?: AvailableCoursesParams) =>
  useQuery({
    queryKey: courseRegistrationQueryKeys.availableCourses(params),
    queryFn: () => {
      if (!params) {
        throw new Error("Course registration parameters are unavailable");
      }

      return getAvailableCourses(params);
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
  });

const getMutationErrorMessage = (error: unknown): string =>
  (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message ?? "Failed to save course selection. Please try again.";

export const useSaveCourseRegistrationDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveCourseRegistrationDraftPayload) =>
      saveCourseRegistrationDraft(payload),
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
