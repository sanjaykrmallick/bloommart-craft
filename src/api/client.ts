import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const getStoredTokens = () => {
  try {
    const stored = localStorage.getItem("auth-storage");
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.state ?? {};
  } catch {
    return {};
  }
};

const clearStoredAuth = () => {
  localStorage.removeItem("auth-storage");
  localStorage.removeItem("ordermesh-access-token");
  localStorage.removeItem("ordermesh-refresh-token");
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken =
    localStorage.getItem("ordermesh-access-token") ||
    getStoredTokens().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const refreshToken =
      localStorage.getItem("ordermesh-refresh-token") ||
      getStoredTokens().refreshToken;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      !refreshToken ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken,
      });
      const { accessToken: nextAccessToken, refreshToken: nextRefreshToken } =
        response.data;
      localStorage.setItem("ordermesh-access-token", nextAccessToken);
      localStorage.setItem("ordermesh-refresh-token", nextRefreshToken);
      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearStoredAuth();
      window.dispatchEvent(new Event("ordermesh:auth-expired"));
      return Promise.reject(refreshError);
    }
  },
);

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
    if (!error.response)
      return "Unable to connect to server. Please check your internet connection.";
  }
  return fallback;
};
