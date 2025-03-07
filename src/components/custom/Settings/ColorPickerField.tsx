import { ColorPickerFieldProps } from "@/lib/dto";
import React from "react";

export default function ColorPickerField({
  label,
  value,
  onHandleInputChange,
  ...props
}: ColorPickerFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onHandleInputChange(event.target.value)}
        {...props}
      />
    </div>
  );
}
