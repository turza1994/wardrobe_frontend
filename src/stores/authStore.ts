import { create } from "zustand";
import { User, Role } from "../types/auth";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  setTokens: (access: string, refresh: string, user: User) => void;
  logout: () => void;
  setAccessToken: (access: string) => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  role: null,
  isAuthenticated: false,

  setTokens: (access, refresh, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("refresh_token", refresh);
    }
    set({
      accessToken: access,
      user,
      role: user.role,
      isAuthenticated: !!access,
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("refresh_token");
    }
    set({
      accessToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
  },

  setAccessToken: (access) => set({ accessToken: access, isAuthenticated: !!access }),

  refreshAccessToken: async () => {
    if (typeof window === "undefined") return false;
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      get().logout();
      return false;
    }

    try {
      // Use native fetch to avoid circular dependency with apiClient
      const res = await fetch("http://localhost:3001/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      get().setAccessToken(data.accessToken);
      return true;
    } catch (error) {
      get().logout();
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
      return false;
    }
  },
}));
