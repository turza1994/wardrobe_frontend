import { API } from '@/constants/api';
import { CACHE_TAGS, REVALIDATE } from '@/constants/cacheTags';
import type { Product, Category, CreateProductPayload, ProductFilters } from '@/types/product';
import { apiClient } from './apiClient';

/**
 * Server-side fetch for products with ISR caching.
 * For use in Server Components only.
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters?.categoryId) params.set('categoryId', filters.categoryId);
  if (filters?.vendorId) params.set('vendorId', filters.vendorId);
  if (filters?.search) params.set('title_like', filters.search);
  if (filters?.minPrice) params.set('price_gte', String(filters.minPrice));
  if (filters?.maxPrice) params.set('price_lte', String(filters.maxPrice));
  if (filters?.page && filters.limit) {
    params.set('_start', String((filters.page - 1) * filters.limit));
    params.set('_limit', String(filters.limit));
  }
  if (filters?.sort === 'price_asc') params.set('_sort', 'price'), params.set('_order', 'asc');
  if (filters?.sort === 'price_desc') params.set('_sort', 'price'), params.set('_order', 'desc');
  if (filters?.sort === 'newest') params.set('_sort', 'createdAt'), params.set('_order', 'desc');
  if (filters?.sort === 'rating') params.set('_sort', 'rating'), params.set('_order', 'desc');

  const url = `${API.PRODUCTS.LIST}${params.toString() ? `?${params.toString()}` : ''}`;

  const res = await fetch(url, {
    next: {
      revalidate: REVALIDATE.PRODUCTS,
      tags: [CACHE_TAGS.PRODUCTS],
    },
  });

  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

/**
 * Server-side fetch for a product by slug with ISR caching.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(API.PRODUCTS.DETAIL(slug), {
    next: {
      revalidate: REVALIDATE.PRODUCT_DETAIL,
      tags: [CACHE_TAGS.PRODUCTS, CACHE_TAGS.PRODUCT(slug)],
    },
  });

  if (!res.ok) return null;
  const products: Product[] = await res.json();
  return products[0] ?? null;
}

/**
 * Server-side fetch for all categories with ISR caching.
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(API.CATEGORIES.LIST, {
    next: {
      revalidate: REVALIDATE.CATEGORIES,
      tags: [CACHE_TAGS.CATEGORIES],
    },
  });

  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

/**
 * Client-side: Create product (vendor action)
 */
export const createProduct = (
  data: CreateProductPayload & { vendorId: string }
): Promise<Product> =>
  apiClient.post<Product>(API.PRODUCTS.CREATE, data);

/**
 * Client-side: Update product
 */
export const updateProduct = (id: string, data: Partial<CreateProductPayload>): Promise<Product> =>
  apiClient.put<Product>(API.PRODUCTS.UPDATE(id), data);

/**
 * Client-side: Delete product
 */
export const deleteProduct = (id: string): Promise<void> =>
  apiClient.delete<void>(API.PRODUCTS.DELETE(id));

/**
 * Client-side: Get product by id
 */
export const getProductById = (id: string): Promise<Product> =>
  apiClient.get<Product>(API.PRODUCTS.BY_ID(id));
