import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "CUSTOMER" | "WAREHOUSE" | "OPERATIONS" | "ADMIN";

export interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,

      login: (user, accessToken, refreshToken) => {
        localStorage.setItem("ordermesh-access-token", accessToken);
        localStorage.setItem("ordermesh-refresh-token", refreshToken);
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem("ordermesh-access-token");
        localStorage.removeItem("ordermesh-refresh-token");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
