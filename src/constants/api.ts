const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const API = {
  BASE_URL: API_BASE_URL,

  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    VERIFY_OTP: `${API_BASE_URL}/verify-otp`,
    REFRESH: `${API_BASE_URL}/refresh`,
    LOGOUT: `${API_BASE_URL}/logout`,
  },

  // Products
  PRODUCTS: {
    LIST: `${API_BASE_URL}/products`,
    DETAIL: (slug: string) => `${API_BASE_URL}/products?slug=${slug}`,
    BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
    CREATE: `${API_BASE_URL}/products`,
    UPDATE: (id: string) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/products/${id}`,
  },

  // Categories
  CATEGORIES: {
    LIST: `${API_BASE_URL}/categories`,
    BY_ID: (id: string) => `${API_BASE_URL}/categories/${id}`,
  },

  // Orders
  ORDERS: {
    LIST: `${API_BASE_URL}/orders`,
    BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
    CREATE: `${API_BASE_URL}/orders`,
    UPDATE: (id: string) => `${API_BASE_URL}/orders/${id}`,
    MY_ORDERS: (userId: string) => `${API_BASE_URL}/orders?userId=${userId}`,
  },

  // Reviews
  REVIEWS: {
    BY_PRODUCT: (productId: string) => `${API_BASE_URL}/reviews?productId=${productId}`,
    CREATE: `${API_BASE_URL}/reviews`,
  },

  // Users
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/users/${id}`,
  },

  // Vendors
  VENDORS: {
    LIST: `${API_BASE_URL}/vendors`,
    BY_ID: (id: string) => `${API_BASE_URL}/vendors/${id}`,
    BY_USER: (userId: string) => `${API_BASE_URL}/vendors?userId=${userId}`,
  },
} as const;
