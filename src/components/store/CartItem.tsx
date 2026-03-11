"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { QuantitySelector } from "./QuantitySelector";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity, selectedSize, selectedColor } = item;
  
  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <Link href={`/products/${product.id}`} className="relative h-24 w-20 sm:h-32 sm:w-28 shrink-0 overflow-hidden rounded-md bg-muted">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100px, 150px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground text-xs">
            No image
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start gap-2 sm:gap-4 flex-col sm:flex-row">
          <div className="space-y-1">
            <h3 className="font-medium text-sm sm:text-base line-clamp-2">
              <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
                {product.title}
              </Link>
            </h3>
            
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>Store: {product.vendorId}</p>
              {(selectedSize || selectedColor) && (
                <p>
                  {selectedColor && <span>Color: {selectedColor}</span>}
                  {selectedColor && selectedSize && <span> | </span>}
                  {selectedSize && <span>Size: {selectedSize}</span>}
                </p>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-medium text-sm sm:text-base">
              {formatCurrency(product.price * quantity)}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.originalPrice * quantity)}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(product.price)} each
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <QuantitySelector 
            value={quantity} 
            onChange={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
            max={product.stock}
          />
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onRemove(item.id)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 px-2 sm:px-3"
          >
            <Trash2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
