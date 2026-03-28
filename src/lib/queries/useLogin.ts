import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { login } from "@/src/lib/api/auth";
import type { LoginPayload } from "@/src/types";

const TOKEN_EXPIRY_DAYS = 7;

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: ({ accessToken, refreshToken }) => {
      Cookies.set("accessToken", accessToken, {
        expires: TOKEN_EXPIRY_DAYS,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        expires: TOKEN_EXPIRY_DAYS,
        secure: true,
        sameSite: "Strict",
      });
    },
  });
};
