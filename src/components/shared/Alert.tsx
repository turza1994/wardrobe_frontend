import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import * as React from "react";

import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "border-l-4 [&>svg]:left-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-success bg-success/10 text-success-foreground [&>svg]:text-success",
        warning: "border-warning bg-warning/10 text-warning-foreground [&>svg]:text-warning",
        danger: "border-destructive bg-destructive/10 text-destructive [&>svg]:text-destructive",
        info: "border-info bg-info/10 text-info-foreground [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

export function Alert({
  variant = "default",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const getIcon = () => {
    switch (variant) {
      case "success": return <CheckCircle2 className="h-4 w-4" />;
      case "warning": return <AlertCircle className="h-4 w-4" />;
      case "danger": return <XCircle className="h-4 w-4" />;
      case "info": return <Info className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <ShadcnAlert variant="default" className={cn(alertVariants({ variant }), className)} {...props}>
      {getIcon()}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </ShadcnAlert>
  );
}
