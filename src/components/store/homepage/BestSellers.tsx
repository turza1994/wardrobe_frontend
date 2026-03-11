import React from 'react';
import { ProductCard } from '@/components/store/ProductCard';
import type { Product } from '@/types/product';

interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  if (!products?.length) return null;

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">Trending Now</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light">
          Our most loved pieces, chosen by you. Shop the styles everyone is talking about.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            badgeVariant="sale" 
            badgeLabel="Best Seller" 
          />
        ))}
      </div>
    </section>
  );
}
