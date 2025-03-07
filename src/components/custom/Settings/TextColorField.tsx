import { TextColorFieldProps } from "@/lib/dto";
import React from "react";

export default function TextColorField({
  value,
  label,
  onHandleInputChange,
}: TextColorFieldProps) {
  // Common color presets for email design
  const colorPresets = [
    "#000000", // Black
    "#FFFFFF", // White
    "#0066CC", // Blue
    "#CC0000", // Red
    "#009933", // Green
    "#FF6600", // Orange
    "#9933CC", // Purple
    "#666666", // Gray
  ];

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHandleInputChange(e.target.value);
  };

  const handlePresetClick = (color: string) => {
    onHandleInputChange(color);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center mb-2">
        <input
          type="color"
          value={value}
          onChange={handleColorChange}
          className="h-10 w-16 p-0 border border-gray-300 rounded-l-md"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onHandleInputChange(e.target.value)}
          className="flex-1 h-10 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="#000000"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {colorPresets.map((color) => (
          <button
            key={color}
            onClick={() => handlePresetClick(color)}
            className="w-6 h-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ backgroundColor: color }}
            title={color}
            aria-label={`Set text color to ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
