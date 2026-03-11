import { apiClient } from "./apiClient";
import { RegisterInput, RegisterResponse, VerifyOtpInput, AuthResponse, LoginInput } from "../types/auth";

export const authService = {
  register: (data: RegisterInput) => apiClient.post<RegisterResponse>("/register", data),
  login: (data: LoginInput) => apiClient.post<AuthResponse>("/login", data),
  verifyOtp: (data: VerifyOtpInput) => apiClient.post<AuthResponse>("/verify-otp", data),
  refreshToken: (refreshToken: string) => apiClient.post<{ accessToken: string }>("/refresh", { refreshToken }),
};
