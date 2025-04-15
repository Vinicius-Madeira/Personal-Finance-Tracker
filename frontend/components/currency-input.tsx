"use client";

import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const BRLCurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  control,
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  // Track the raw numeric value (in cents) internally
  const [rawValue, setRawValue] = useState(() => {
    // Initialize from field value if available
    if (field.value !== undefined && field.value !== "") {
      return Math.round(field.value * 100);
    }
    return 0;
  });

  // Format a cents value to BRL display format
  const formatCentsToBRL = (cents: number): string => {
    if (cents === 0) return "0,00";

    // Convert to string and ensure it has at least 3 digits
    let valueStr = cents.toString().padStart(3, "0");

    // Extract decimal part (last 2 digits)
    const decimalPart = valueStr.slice(-2);

    // Get integer part
    const integerPart = valueStr.slice(0, -2);

    // Format integer part with thousand separators
    let formattedInteger = "";
    for (let i = 0; i < integerPart.length; i++) {
      if (i > 0 && (integerPart.length - i) % 3 === 0) {
        formattedInteger += ".";
      }
      formattedInteger += integerPart[i];
    }

    return `${formattedInteger || "0"},${decimalPart}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get only numeric value from input
    const inputValue = e.target.value.replace(/\D/g, "");

    // Convert to number (as cents)
    const cents = inputValue === "" ? 0 : parseInt(inputValue, 10);

    // Update internal raw value
    setRawValue(cents);

    // Format for display
    const formattedValue = formatCentsToBRL(cents);

    // Update react-hook-form with actual decimal value
    field.onChange(cents / 100);

    // Set the formatted value to input
    e.target.value = formattedValue;
  };

  // Get the formatted display value
  const displayValue = formatCentsToBRL(rawValue);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        {...props}
        {...field}
        value={displayValue}
        onChange={handleChange}
        onBlur={field.onBlur}
        className={cn(
          "font-mono text-left",
          error && "border-red-500 focus-visible:ring-red-500",
          inputClassName
        )}
      />
    </div>
  );
};
