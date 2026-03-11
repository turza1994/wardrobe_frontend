"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { type ControllerRenderProps } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  render: (props: { field: ControllerRenderProps<any, string> }) => React.ReactNode;
}

export function FormField({
  name,
  label,
  description,
  required,
  className,
  render,
}: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<any, string> }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>{render({ field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
