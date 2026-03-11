import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  container?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
}

export function Section({
  className,
  as: Component = "section",
  container = true,
  spacing = "md",
  children,
  ...props
}: SectionProps) {
  const content = (
    <Component
      className={cn(
        {
          "py-8 md:py-12": spacing === "sm",
          "py-12 md:py-16": spacing === "md",
          "py-16 md:py-24": spacing === "lg",
          "py-24 md:py-32": spacing === "xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );

  return container ? <Container>{content}</Container> : content;
}
