export type UserRole = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  mobile: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginPayload {
  mobile: string;
  password: string;
}

export interface RegisterPayload {
  mobile: string;
  name: string;
  email: string;
  password: string;
}

export interface OTPVerifyPayload {
  mobile: string;
  otp: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
  mobile: string;
}
