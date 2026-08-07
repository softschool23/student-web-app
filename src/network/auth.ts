import type { LoginPayload, LoginResponse } from "@/src/types";

import { authApiClient } from "./config";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await authApiClient.post<LoginResponse>(
    "/auth/login",
    payload,
  );
  return data;
};
