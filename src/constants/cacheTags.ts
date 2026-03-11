export const CACHE_TAGS = {
  PRODUCTS: 'products',
  PRODUCT: (id: string) => `product-${id}`,
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  ORDER: (id: string) => `order-${id}`,
  USERS: 'users',
  USER: (id: string) => `user-${id}`,
  VENDORS: 'vendors',
  REVIEWS: 'reviews',
} as const;

export const REVALIDATE = {
  PRODUCTS: 60,       // 1 minute ISR
  CATEGORIES: 300,    // 5 minutes ISR
  PRODUCT_DETAIL: 60, // 1 minute ISR
} as const;
