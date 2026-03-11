"use client";

import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    // Basic formatting for BD numbers: +880 1XXX-XXXXXX
    const formatPhoneNumber = (val: string) => {
      // Strip all non-digits
      const digits = val.replace(/\D/g, "");
      
      // Auto-prefix 880 if user typed 01...
      let normalized = digits;
      if (normalized.startsWith("01")) {
        normalized = "880" + normalized.substring(1);
      }
      
      // Enforce max length of 13 digits (880 + 10 digits)
      normalized = normalized.slice(0, 13);
      
      return normalized;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      // Create a synthetic event to pass down the formatted value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formatted,
          name: e.target.name
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange?.(syntheticEvent);
    };

    // Display formatting
    let displayValue = value as string || "";
    if (displayValue.startsWith("880")) {
      const rest = displayValue.slice(3);
      if (rest.length > 4) {
        displayValue = `+880 ${rest.slice(0, 4)}-${rest.slice(4)}`;
      } else if (rest.length > 0) {
        displayValue = `+880 ${rest}`;
      } else {
        displayValue = "+880";
      }
    }

    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none pointer-events-none text-sm">
          🇧🇩
        </span>
        <Input
          type="tel"
          ref={ref}
          className={cn("pl-9 font-mono tracking-wide", className)}
          placeholder="+880 1XXX-XXXXXX"
          value={displayValue}
          onChange={handleChange}
          maxLength={15} // +880 XXXX-XXXXXX = 15 chars max
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";
