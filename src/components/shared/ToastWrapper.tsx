'use client';
import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function ToastWrapper() {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-success group-[.toaster]:bg-success/5 group-[.toaster]:text-success-foreground",
          error: "group-[.toaster]:border-destructive group-[.toaster]:bg-destructive/5 group-[.toaster]:text-destructive-foreground",
          warning: "group-[.toaster]:border-warning group-[.toaster]:bg-warning/5 group-[.toaster]:text-warning-foreground",
          info: "group-[.toaster]:border-info group-[.toaster]:bg-info/5 group-[.toaster]:text-info-foreground",
        },
      }}
      position="top-right"
      richColors
      closeButton
    />
  );
}
