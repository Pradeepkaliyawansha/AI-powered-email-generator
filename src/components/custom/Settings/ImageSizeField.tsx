import { InputFieldProps } from "@/lib/dto";
import React from "react";

export default function ImageSizeField({
  label,
  value,
  onHandleInputChange,
  ...props
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(event) => onHandleInputChange(event.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        {...props}
      />
    </div>
  );
}
