import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/product';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link 
      href={`/products?categoryId=${category.id}`}
      className={cn(
        "group relative overflow-hidden rounded-xl aspect-[4/5] sm:aspect-square md:aspect-[3/4] block isolate hover:-translate-y-1 transition-transform duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-muted">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/50">
            <span className="text-muted-foreground">{category.name}</span>
          </div>
        )}
      </div>

      {/* Overlay gradient - slightly tinted with rose/amber for feminine touch */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:from-rose-950/90 transition-colors duration-500" />

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl md:text-2xl font-serif text-white mb-1 drop-shadow-sm">
          {category.name}
        </h3>
        
        <div className="flex items-center text-white/80 text-sm overflow-hidden h-0 group-hover:h-auto group-hover:mt-2 transition-all opacity-0 group-hover:opacity-100 duration-300 translate-y-4 group-hover:translate-y-0">
          <span className="mr-2 uppercase tracking-wider text-xs font-semibold">Shop Now</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
