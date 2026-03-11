import React from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/store/ProductCard';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

export function FeaturedProducts({
  products,
  title = "New Arrivals",
  subtitle = "Fresh styles just added to our collection. Discover the latest trends before they're gone.",
  linkText = "View All New Arrivals",
  linkHref = "/products?sort=newest"
}: FeaturedProductsProps) {
  if (!products?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">{title}</h2>
            <p className="text-muted-foreground text-base md:text-lg font-light">
              {subtitle}
            </p>
          </div>
          
          <Button variant="outline" asChild className="shrink-0 w-full md:w-auto rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors">
            <Link href={linkHref}>
              {linkText}
            </Link>
          </Button>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-8 snap-x snap-mandatory hide-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-start mr-4 md:mr-0 last:mr-0">
              <ProductCard 
                product={product} 
                badgeVariant="new" 
                badgeLabel="New" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
