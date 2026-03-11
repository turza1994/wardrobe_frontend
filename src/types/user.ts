import type { UserRole } from './auth';

export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  rating: number;
  totalSales: number;
  isVerified: boolean;
  logo: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  mobile: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}
