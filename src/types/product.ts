export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  stock: number;
  sku: string;
  vendorId: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  vendorId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
}

export interface CreateProductPayload {
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  stock: number;
  sku: string;
  categoryId: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  isFeatured?: boolean;
}
