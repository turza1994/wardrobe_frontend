'use client';
import { forwardRef } from 'react';
// TODO: Implement PhoneInput
export const PhoneInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input ref={ref} {...props} />
);
PhoneInput.displayName = 'PhoneInput';
