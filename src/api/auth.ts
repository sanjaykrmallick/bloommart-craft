import { apiClient } from "./client";

export type BackendRole = "CUSTOMER" | "WAREHOUSE" | "OPERATIONS" | "ADMIN";

export interface BackendUser {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role: BackendRole;
  isActive?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: BackendUser;
}

export interface RegisterPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
}

export const login = async (email: string, password: string) =>
  (await apiClient.post<LoginResponse>("/auth/login", { email, password }))
    .data;

export const register = async (payload: RegisterPayload) =>
  (await apiClient.post<BackendUser>("/auth/register", payload)).data;

export const getMe = async () =>
  (await apiClient.get<BackendUser>("/users/me")).data;
export const updateMe = async (payload: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}) => (await apiClient.patch<BackendUser>("/users/me", payload)).data;
export const deactivateMe = async () =>
  (await apiClient.delete("/users/me")).data;
export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => (await apiClient.post("/auth/change-password", payload)).data;
