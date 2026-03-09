import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// ─── Auth API Client (open – no auth header) ────────────────────────────────
export const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ─── Academic API Client (protected – requires access token) ─────────────────
export const academicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ACADEMIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every academic request
academicApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

// ─── Token refresh logic ──────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  failedQueue = [];
};

academicApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return academicApiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      isRefreshing = false;
      processQueue(error, null);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      const shortName = window.location.pathname.split("/")[1];
      window.location.href = `/${shortName}`;
      return Promise.reject(error);
    }

    try {
      const { data } = await authApiClient.post<{
        access_token: string;
        refresh_token: string;
      }>("/auth/refresh-token", { refreshToken });

      Cookies.set("accessToken", data.access_token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", data.refresh_token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      processQueue(null, data.access_token);
      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      return academicApiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      const shortName = window.location.pathname.split("/")[1];
      window.location.href = `/${shortName}`;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// Keep default export pointing at auth client for backward compatibility
export default authApiClient;
