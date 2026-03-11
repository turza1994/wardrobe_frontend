import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mb-8",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex w-full items-center gap-2 md:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
