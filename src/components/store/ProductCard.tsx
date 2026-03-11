// TODO: Implement ProductCard
import type { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
  return <div>ProductCard: {product.title}</div>;
}
