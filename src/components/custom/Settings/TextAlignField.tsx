import React from "react";
import { cn } from "@/lib/utils";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { TextAlignFieldProps } from "@/lib/dto";

export default function TextAlignField({
  value,
  label,
  onHandleInputChange,
}: TextAlignFieldProps) {
  const alignOptions = [
    { value: "left", icon: AlignLeft, label: "Left" },
    { value: "center", icon: AlignCenter, label: "Center" },
    { value: "right", icon: AlignRight, label: "Right" },
    { value: "justify", icon: AlignJustify, label: "Justify" },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        {alignOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onHandleInputChange(option.value)}
              className={cn(
                "flex-1 py-2 px-3 flex items-center justify-center transition-colors",
                value === option.value
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100"
              )}
              aria-label={`Align text ${option.label}`}
              title={`Align text ${option.label}`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
