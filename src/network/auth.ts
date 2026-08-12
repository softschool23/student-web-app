import type {
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
} from "@/src/types";

import { authApiClient } from "./config";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await authApiClient.post<LoginResponse>(
    "/auth/login",
    payload,
  );
  return data;
};

export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<void> => {
  await authApiClient.post("/users/change-password", payload);
};
