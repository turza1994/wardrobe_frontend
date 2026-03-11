"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ 
  product, 
  className,
  variant = "default",
  size = "default"
}: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    setStatus("loading");
    
    // Simulate API call/Zustand action
    setTimeout(() => {
      setStatus("added");
      toast.success(`${product.title} added to cart`);
      
      // Reset after 2s
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }, 600);
  };

  if (isOutOfStock) {
    return (
      <Button 
        type="button" 
        disabled 
        variant="secondary"
        className={cn("opacity-70 cursor-not-allowed", className)}
        size={size}
      >
        Out of Stock
      </Button>
    );
  }

  return (
    <Button 
      type="button" 
      onClick={handleAddToCart}
      disabled={status !== "idle"}
      variant={status === "added" ? "secondary" : variant}
      className={cn(
        "transition-all duration-300", 
        status === "added" && "bg-success/20 text-success hover:bg-success/30 border-success/30",
        className
      )}
      size={size}
    >
      {status === "idle" && (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
      {status === "loading" && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      )}
      {status === "added" && (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      )}
    </Button>
  );
}
