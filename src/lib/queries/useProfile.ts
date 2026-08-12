import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { studentQueryKeys } from "@/src/lib/queries/useMe";
import { changePassword } from "@/src/network/auth";
import { updateCollegeStudentProfile } from "@/src/network/student";
import type {
  ChangePasswordPayload,
  UpdateCollegeStudentProfilePayload,
} from "@/src/types";

const getMutationErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string =>
  (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message ?? fallbackMessage;

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCollegeStudentProfilePayload) => {
      return updateCollegeStudentProfile(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: studentQueryKeys.me });
      toast.success("Profile updated successfully.");
    },
    onError: (error) => {
      toast.error(
        getMutationErrorMessage(error, "Unable to update your profile."),
      );
    },
  });
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully.");
    },
    onError: (error) => {
      toast.error(
        getMutationErrorMessage(error, "Unable to change your password."),
      );
    },
  });
