import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-12 w-12",
    },
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <div role="status" className={cn("inline-flex justify-center items-center", className)} {...props}>
      <Loader2 className={cn(spinnerVariants({ size, variant }))} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
