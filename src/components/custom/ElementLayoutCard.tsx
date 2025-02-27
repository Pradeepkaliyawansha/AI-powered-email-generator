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
        className="group hover:shadow-md hover:border-primary dark:hover:border-white cursor-pointer flex items-center justify-center border border-dashed rounded-xl p-3 dark:bg-green-800"
      >
        <layoutItems.icon className="p-2 h-9 w-9 bg-green-100 rounded-full dark:text-black group-hover:text-green-800" />
        <h2 className="text-sm">{layoutItems.label}</h2>
      </div>
    );
  }

  if (elementList) {
    return (
      <div
        key={elementList.type}
        className="group hover:shadow-md hover:border-primary dark:hover:border-white cursor-pointer flex items-center justify-center border border-dashed rounded-xl p-3 dark:bg-green-800"
      >
        <elementList.icon className="p-2 h-9 w-9 bg-green-100 rounded-full dark:text-black group-hover:text-green-800" />
        <h2 className="text-sm">{elementList.label}</h2>
      </div>
    );
  }

  return null;
}
