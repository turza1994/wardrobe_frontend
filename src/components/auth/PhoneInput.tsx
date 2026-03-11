"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  onChange: (value: string) => void;
  value: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
      if (pastedData) {
        // Enforce 11 digits max
        onChange(pastedData.slice(0, 11));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      // Remove any non-digit characters
      inputValue = inputValue.replace(/\D/g, "");

      // Optional: Auto-prepend '01' if the user starts typing '3' to '9'
      if (inputValue.length === 1 && /^[3-9]$/.test(inputValue)) {
        inputValue = `01${inputValue}`;
      } else if (inputValue.length === 2 && inputValue[0] === "1" && /^[3-9]$/.test(inputValue[1])) {
        inputValue = `0${inputValue}`;
      }

      // Max length 11
      onChange(inputValue.slice(0, 11));
    };

    return (
      <div className="relative">
        {/* Optional prefix display */}
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          +88
        </div> */}
        <Input
          ref={ref}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="01XXXXXXXXX"
          className={cn("w-full transition-shadow focus-visible:ring-pink-500/50", className)}
          onPaste={handlePaste}
          onChange={handleChange}
          value={value}
          maxLength={11}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
