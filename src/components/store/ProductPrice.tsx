import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatCurrency"; // We need to create this helper

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  currency?: string;
}

export function ProductPrice({
  price,
  originalPrice,
  className,
  size = "md",
  currency = "BDT",
}: ProductPriceProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  
  // Calculate discount percentage
  const discountPercent = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg md:text-xl",
    xl: "text-2xl md:text-3xl",
  };

  const originalSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <div className={cn("flex items-center flex-wrap gap-2", className)}>
      <span className={cn("font-bold text-foreground", sizeClasses[size])}>
        {formatCurrency(price, currency)}
      </span>
      
      {hasDiscount && (
        <>
          <span 
            className={cn(
              "text-muted-foreground line-through", 
              originalSizeClasses[size]
            )}
            aria-label="Original price"
          >
            {formatCurrency(originalPrice, currency)}
          </span>
          <span className="text-xs font-semibold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-sm">
            -{discountPercent}%
          </span>
        </>
      )}
    </div>
  );
}
