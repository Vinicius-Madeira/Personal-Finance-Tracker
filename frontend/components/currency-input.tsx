import React from "react";
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

  // Format the value to display with comma as decimal separator
  const formatToBRL = (value: string | number): string => {
    if (value === "" || value === undefined || value === null) return "";

    // Convert to string and ensure it's a valid number format
    let numStr = String(value).replace(/[^\d]/g, "");

    // Convert to cents (integer representation)
    const cents = numStr === "" ? 0 : parseInt(numStr, 10);

    // Convert cents to real value with 2 decimal places
    const realValue = (cents / 100).toFixed(2);

    // Split into integer and decimal parts
    const [intPart, decPart] = realValue.split(".");

    // Format integer part with thousand separators (dots)
    let formattedInt = "";
    for (let i = 0; i < intPart.length; i++) {
      if (i > 0 && (intPart.length - i) % 3 === 0) {
        formattedInt += ".";
      }
      formattedInt += intPart[i];
    }

    return `${formattedInt},${decPart}`;
  };

  // Convert formatted string back to number for form value
  const parseFromBRL = (formattedValue: string): number => {
    if (!formattedValue) return 0;

    // Remove thousand separators and replace comma with dot for JS number parsing
    const numberStr = formattedValue.replace(/\./g, "").replace(",", ".");
    return parseFloat(numberStr);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Strip all non-numeric characters
    const numericValue = rawValue.replace(/[^\d]/g, "");

    // Format the value
    const formattedValue = formatToBRL(numericValue);

    // Update the field with formatted display and parsed numeric value
    e.target.value = formattedValue;
    field.onChange(parseFromBRL(formattedValue));
  };

  // Format initial value when component mounts or when value changes from outside
  const displayValue =
    field.value !== undefined && field.value !== ""
      ? formatToBRL(field.value * 100) // Multiply by 100 to convert to cents for formatting
      : "";

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
      {error && (
        <p className={cn("text-sm font-medium text-red-500", errorClassName)}>
          {error.message}
        </p>
      )}
    </div>
  );
};
