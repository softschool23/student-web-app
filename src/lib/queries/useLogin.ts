import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "@/src/types";

import { login } from "@/src/network/auth";
import { setAuthTokens } from "@/src/network/config";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: ({ accessToken, refreshToken }) => {
      setAuthTokens({ accessToken, refreshToken });
    },
  });
};
