"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      // Don't cap immediately on typing to allow user to backspace and retype
      if (val >= 0 && val <= max * 10) {
        onChange(val);
      }
    } else if (e.target.value === "") {
      onChange(0);
    }
  };

  const handleBlur = () => {
    if (value < min) onChange(min);
    if (value > max) onChange(max);
  };

  return (
    <div className={cn("flex items-center border rounded-md h-9 w-fit", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-full w-9 rounded-none rounded-l-md hover:bg-muted"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <input
        type="number"
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className="h-full w-10 text-center text-sm font-medium border-x-0 border-y-0 bg-transparent focus:outline-none focus:ring-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <Button
        variant="ghost"
        size="icon"
        className="h-full w-9 rounded-none rounded-r-md hover:bg-muted"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
