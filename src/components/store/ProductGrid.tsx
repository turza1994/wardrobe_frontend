// TODO: Implement ProductGrid
import type { Product } from '@/types/product';

export function ProductGrid({ products }: { products: Product[] }) {
  return <div>ProductGrid ({products.length} items)</div>;
}
