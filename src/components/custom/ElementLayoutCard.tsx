import { ElementLayoutCardProps } from "@/lib/dto";
import React from "react";

export default function ElementLayoutCard({
  layoutItems,
  elementList,
}: Partial<ElementLayoutCardProps>) {
  if (layoutItems) {
    return (
      <div
        key={layoutItems.type}
        className="group hover:shadow-md hover:border-primary dark:hover:border-white cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 border border-dashed rounded-xl p-2 sm:p-3 dark:bg-green-800 transition-all duration-200"
      >
        <layoutItems.icon className="p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 bg-green-100 rounded-full dark:text-black group-hover:text-green-800 flex-shrink-0" />
        <h2 className="text-xs sm:text-sm font-medium text-center sm:text-left">
          {layoutItems.label}
        </h2>
      </div>
    );
  }

  if (elementList) {
    return (
      <div
        key={elementList.type}
        className="group hover:shadow-md hover:border-primary dark:hover:border-white cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 border border-dashed rounded-xl p-2 sm:p-3 dark:bg-green-800 transition-all duration-200"
      >
        <elementList.icon className="p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 bg-green-100 rounded-full dark:text-black group-hover:text-green-800 flex-shrink-0" />
        <h2 className="text-xs sm:text-sm font-medium text-center sm:text-left">
          {elementList.label}
        </h2>
      </div>
    );
  }

  return null;
}
