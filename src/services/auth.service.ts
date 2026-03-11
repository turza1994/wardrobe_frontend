import { apiClient } from './apiClient';
import { API } from '@/constants/api';
import type {
  AuthResponse,
  LoginPayload,
  OTPVerifyPayload,
  RegisterPayload,
  RegisterResponse,
  TokenPair,
} from '@/types/auth';

export const authService = {
  /**
   * POST /login
   * Returns accessToken + refreshToken + user
   */
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>(API.AUTH.LOGIN, payload, { skipAuth: true }),

  /**
   * POST /register → { message: "OTP sent", mobile }
   */
  register: (payload: RegisterPayload): Promise<RegisterResponse> =>
    apiClient.post<RegisterResponse>(API.AUTH.REGISTER, payload, { skipAuth: true }),

  /**
   * POST /verify-otp → returns accessToken + refreshToken + user
   */
  verifyOTP: (payload: OTPVerifyPayload): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>(API.AUTH.VERIFY_OTP, payload, { skipAuth: true }),

  /**
   * POST /refresh → returns new accessToken
   */
  refreshToken: (refreshToken: string): Promise<TokenPair> =>
    apiClient.post<TokenPair>(API.AUTH.REFRESH, { refreshToken }, { skipAuth: true }),

  /**
   * POST /logout
   */
  logout: (): Promise<void> =>
    apiClient.post<void>(API.AUTH.LOGOUT),
};
