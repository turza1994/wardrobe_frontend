export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    VERIFY_OTP: '/verify-otp',
  },

  // Store routes
  STORE: {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
  },

  // Dashboard routes
  DASHBOARD: {
    HOME: '/dashboard',
    PRODUCTS: '/dashboard/products',
    PRODUCT_NEW: '/dashboard/products/new',
    PRODUCT_EDIT: (id: string) => `/dashboard/products/${id}`,
    ORDERS: '/dashboard/orders',
    USERS: '/dashboard/users',
    VENDORS: '/dashboard/vendors',
  },
} as const;
