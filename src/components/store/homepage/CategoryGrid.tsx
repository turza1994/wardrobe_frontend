import React from 'react';
import { CategoryCard } from './CategoryCard';
import type { Category } from '@/types/product';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories?.length) return null;

  // We'll only show the first 8 categories to keep the grid clean
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">Discover Our Collections</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg font-light">
          From everyday essentials to statement pieces, find exactly what you&apos;re looking for tailored to your unique style.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {displayCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
