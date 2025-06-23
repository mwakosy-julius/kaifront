import axios from "axios";
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "./config";
import { ApiError, ApiResponse } from "./types";
import { apiLogger } from "./logger";
import Cookies from "js-cookie";

// Cookie configuration
const COOKIE_CONFIG = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleAuthError = () => {
  apiLogger.info("Authentication failed, logging out user");
  Cookies.remove(ACCESS_TOKEN_COOKIE, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_COOKIE, { path: "/" });
  window.location.href = "/sign-in";
};

const handleError = (
  error: AxiosError<{
    message?: string;
    error?: string;
    code?: string;
    detail: string;
  }>,
): ApiError => {
  const apiError = {
    message: error.response?.data.detail as string,
    status: error.response?.status || 500,
    code: error.response?.data?.error,
  };
  console.error(error.response?.data?.error);
  apiLogger.debug("Formatted API Error", apiError);
  return apiError;
};

// Setup request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(ACCESS_TOKEN_COOKIE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    apiLogger.request(
      config.method?.toUpperCase() || "UNKNOWN",
      config.url || "UNKNOWN",
      config.data,
    );

    return config;
  },
  (error) => {
    apiLogger.error(
      error.config?.method?.toUpperCase() || "UNKNOWN",
      error.config?.url || "UNKNOWN",
      error.config?.data,
    );
    return Promise.reject(error.config?.data);
  },
);

// Setup response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    apiLogger.response(
      response.config.method?.toUpperCase() || "UNKNOWN",
      response.config.url || "UNKNOWN",
      response,
    );

    // Handle setting tokens from response headers if they exist
    const newAccessToken = response.headers["x-access-token"];
    const newRefreshToken = response.headers["x-refresh-token"];

    console.log(response);
    if (newAccessToken) {
      Cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken, COOKIE_CONFIG);
    }
    if (newRefreshToken) {
      Cookies.set(REFRESH_TOKEN_COOKIE, newRefreshToken, COOKIE_CONFIG);
    }

    return response;
  },
  async (
    error: AxiosError<{ message?: string; code?: string; detail: string }>,
  ) => {
    const originalRequest = error.config;

    apiLogger.error(
      originalRequest?.method?.toUpperCase() || "UNKNOWN",
      originalRequest?.url || "UNKNOWN",
      error,
    );

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && originalRequest) {
      try {
        apiLogger.info("Token expired, attempting to refresh...");

        const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);
        if (refreshToken) {
          const response = await axiosInstance.post("/auth/refresh/", {
            refreshToken,
          });

          // The new tokens should be set by the server in HTTP-only cookies
          // But if they're in the response body for some reason, we'll handle that too
          const { accessToken } = response.data;
          if (accessToken) {
            Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, COOKIE_CONFIG);
          }

          apiLogger.info("Token refreshed successfully");

          // Update the authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${
            accessToken || Cookies.get(ACCESS_TOKEN_COOKIE)
          }`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        apiLogger.error(
          "REFRESH",
          "/auth/refresh/",
          refreshError as AxiosError<{
            message?: string;
            code?: string;
            detail: string;
          }>,
        );
        handleAuthError();
      }
    }

    return Promise.reject(handleError(error));
  },
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.get<ApiResponse<T>>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
  return response.data;
};

export const put = async <T>(
  url: string,
  data?: unknown,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.put<ApiResponse<T>>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.delete<ApiResponse<T>>(url);
  return response.data;
};

export const apiClient = {
  get,
  post,
  put,
  delete: del,
} as const;
