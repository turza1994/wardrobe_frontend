import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProductBadgeVariant = "new" | "sale" | "featured" | "out-of-stock";

interface ProductBadgeProps {
  variant: ProductBadgeVariant;
  className?: string;
  label?: string;
}

export function ProductBadge({
  variant,
  className,
  label,
}: ProductBadgeProps) {
  const defaultLabels = {
    new: "New Arrival",
    sale: "Sale",
    featured: "Featured",
    "out-of-stock": "Out of Stock",
  };

  const text = label || defaultLabels[variant];

  // Map variants to specific styling
  const variantStyles = {
    new: "bg-success text-success-foreground hover:bg-success/90",
    sale: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    featured: "bg-info text-info-foreground hover:bg-info/90",
    "out-of-stock": "bg-muted text-muted-foreground hover:bg-muted/90",
  };

  return (
    <Badge
      className={cn(
        "font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5",
        variantStyles[variant],
        className
      )}
    >
      {text}
    </Badge>
  );
}
