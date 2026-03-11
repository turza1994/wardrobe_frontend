import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductPrice } from "./ProductPrice";
import { ProductRating } from "./ProductRating";
import { ProductBadge, type ProductBadgeVariant } from "./ProductBadge";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  badgeVariant?: ProductBadgeVariant;
  badgeLabel?: string;
}

export function ProductCard({ product, badgeVariant, badgeLabel }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden flex flex-col h-full bg-card transition-all duration-300 hover:shadow-md border-border/50 hover:border-border">
      <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-muted/30">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        
        {badgeVariant && (
          <div className="absolute top-3 left-3 z-10">
            <ProductBadge variant={badgeVariant} label={badgeLabel} />
          </div>
        )}
      </Link>
      
      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span className="truncate">{product.vendorId}</span>
        </div>
        
        <Link href={`/products/${product.slug}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-medium text-base line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2">
          <ProductRating 
            rating={product.rating} 
            reviewCount={product.reviewCount} 
            size="sm"
          />
        </div>
        
        <ProductPrice 
          price={product.price}
          originalPrice={product.originalPrice}
          size="md"
        />
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
