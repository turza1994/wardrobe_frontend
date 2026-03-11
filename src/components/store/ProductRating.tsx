import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function ProductRating({
  rating,
  maxRating = 5,
  reviewCount,
  className,
  size = "md",
  showCount = true,
}: ProductRatingProps) {
  // Normalize rating
  const safeRating = Math.max(0, Math.min(rating, maxRating));
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const iconClass = cn(sizeClasses[size], "fill-warning text-warning");
  const emptyClass = cn(sizeClasses[size], "text-muted fill-muted");

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex -space-x-0.5" aria-label={`Rating: ${safeRating} out of ${maxRating}`}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={iconClass} />
        ))}
        {hasHalfStar && <StarHalf className={iconClass} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={emptyClass} />
        ))}
      </div>
      
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
