import { apiClient } from './apiClient';
import { API } from '@/constants/api';
import type { UserProfile } from '@/types/user';
import type { Vendor } from '@/types/user';

export const userService = {
  /**
   * Get all users (admin only)
   */
  getUsers: (): Promise<UserProfile[]> =>
    apiClient.get<UserProfile[]>(API.USERS.LIST),

  /**
   * Get a single user
   */
  getUserById: (id: string): Promise<UserProfile> =>
    apiClient.get<UserProfile>(API.USERS.BY_ID(id)),

  /**
   * Update a user profile
   */
  updateUser: (id: string, data: Partial<UserProfile>): Promise<UserProfile> =>
    apiClient.put<UserProfile>(API.USERS.UPDATE(id), data),

  /**
   * Get all vendors
   */
  getVendors: (): Promise<Vendor[]> =>
    apiClient.get<Vendor[]>(API.VENDORS.LIST),

  /**
   * Get vendor profile for a user
   */
  getVendorByUserId: (userId: string): Promise<Vendor[]> =>
    apiClient.get<Vendor[]>(API.VENDORS.BY_USER(userId)),
};
