import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

import type { AuthTokens, RefreshTokenResponse } from "@/src/types";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";
const TOKEN_EXPIRY_DAYS = 7;

const cookieOptions = {
  expires: TOKEN_EXPIRY_DAYS,
  path: "/",
  sameSite: "Strict" as const,
  secure: process.env.NODE_ENV === "production",
};

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_COOKIE);

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_COOKIE);

export const setAuthTokens = ({ accessToken, refreshToken }: AuthTokens) => {
  Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, cookieOptions);
  Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, cookieOptions);
};

export const clearAuthTokens = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE, cookieOptions);
  Cookies.remove(REFRESH_TOKEN_COOKIE, cookieOptions);
};

export const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const academicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ACADEMIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const platformApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLATFORM_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const attachAccessToken = (client: AxiosInstance) => {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
};

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshRequest: Promise<RefreshTokenResponse> | null = null;
let isRedirectingToLogin = false;

const redirectToLogin = () => {
  if (typeof window === "undefined" || isRedirectingToLogin) return;

  isRedirectingToLogin = true;
  const shortName = window.location.pathname.split("/").filter(Boolean)[0];
  window.location.assign(shortName ? `/${shortName}` : "/");
};

const refreshAuthTokens = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token is unavailable");
  }

  const { data } = await authApiClient.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    { refreshToken },
  );

  setAuthTokens(data);
  return data;
};

const getRefreshedTokens = () => {
  if (!refreshRequest) {
    refreshRequest = refreshAuthTokens().finally(() => {
      refreshRequest = null;
    });
  }

  return refreshRequest;
};

const attachTokenRefresh = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const status = error.response?.status;
      const shouldRefresh = status === 401 || status === 403;

      if (!originalRequest || !shouldRefresh || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { accessToken } = await getRefreshedTokens();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    },
  );
};

[academicApiClient, platformApiClient].forEach((client) => {
  attachAccessToken(client);
  attachTokenRefresh(client);
});
