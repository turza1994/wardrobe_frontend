export type Role = "customer" | "vendor" | "admin";
export type UserRole = Role;

export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterInput {
  mobile: string;
  name: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegisterResponse {
  mobile: string;
  message: string;
}

export interface VerifyOtpInput {
  mobile: string;
  otp: string;
}

export interface LoginInput {
  mobile: string;
  password?: string;
}
