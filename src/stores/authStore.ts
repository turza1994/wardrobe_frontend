import { create } from 'zustand';
import type { User, UserRole } from '@/types/auth';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (accessToken: string, user: User, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken?: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;

const REFRESH_TOKEN_KEY = 'refresh_token';

export const useAuthStore = create<AuthStore>((set) => ({
  // State
  accessToken: null,
  user: null,
  role: null,
  isAuthenticated: false,

  // Actions
  login: (accessToken, user, refreshToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    set({
      accessToken,
      user,
      role: user.role,
      isAuthenticated: true,
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    set({
      accessToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
  },

  setTokens: (accessToken, refreshToken) => {
    if (refreshToken && typeof window !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    set({ accessToken });
  },

  setUser: (user) => {
    set({ user, role: user.role });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    set({
      accessToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));

// Helper to get refresh token from localStorage
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};
