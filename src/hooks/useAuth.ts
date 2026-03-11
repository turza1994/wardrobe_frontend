import { useAuthStore } from "../stores/authStore";

export function useAuth() {
  const { accessToken, user, role, isAuthenticated, setTokens, logout } = useAuthStore();

  return {
    accessToken,
    user,
    role,
    isAuthenticated,
    setTokens,
    logout,
  };
}
