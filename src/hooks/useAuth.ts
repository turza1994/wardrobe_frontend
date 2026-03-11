'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, getRefreshToken } from '@/stores/authStore';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/constants/routes';
import type { LoginPayload, RegisterPayload, OTPVerifyPayload } from '@/types/auth';

export function useAuth() {
  const router = useRouter();
  const { accessToken, user, role, isAuthenticated, login, logout, clearAuth } = useAuthStore();

  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      const response = await authService.login(payload);
      login(response.accessToken, response.user, response.refreshToken);
      router.push(ROUTES.STORE.HOME);
      return response;
    },
    [login, router]
  );

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    return authService.register(payload);
  }, []);

  const handleVerifyOTP = useCallback(
    async (payload: OTPVerifyPayload) => {
      const response = await authService.verifyOTP(payload);
      login(response.accessToken, response.user, response.refreshToken);
      router.push(ROUTES.STORE.HOME);
      return response;
    },
    [login, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // ignore logout errors
    } finally {
      logout();
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [logout, router]);

  return {
    accessToken,
    user,
    role,
    isAuthenticated,
    refreshToken: getRefreshToken(),
    login: handleLogin,
    register: handleRegister,
    verifyOTP: handleVerifyOTP,
    logout: handleLogout,
    clearAuth,
  };
}
