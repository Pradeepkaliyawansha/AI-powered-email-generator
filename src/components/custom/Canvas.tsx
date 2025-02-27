"use client";

import {
  useDragElementLayout,
  useEmailTemplate,
  useScreenSize,
} from "@/app/provider";
import { EmailTemplateType } from "@/lib/dto";
import { cn } from "@/lib/utils";
import React, { useState, DragEvent } from "react";

export default function Canvas() {
  const { screenSize } = useScreenSize();
  const { dragDropState } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [dragOver, setDragOver] = useState<boolean>(false);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const onDropHandle = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (dragDropState?.dargLayout) {
      console.log(dragDropState.dargLayout);
      setEmailTemplate((prev: EmailTemplateType) => {
        // Create a new content array ensuring type compatibility
        const newContent = Array.isArray(prev.content)
          ? [...prev.content, dragDropState.dargLayout as unknown as string]
          : [dragDropState.dargLayout as unknown as string];

        return {
          ...prev,
          content: newContent,
          length: newContent.length,
        };
      });
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={cn(
          "w-full bg-white p-6",
          screenSize.isDesktop ? "max-w-2xl" : "max-w-md",
          dragOver && "bg-green-300"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropHandle}
        aria-label="Email template canvas"
        role="region"
      >
        {emailTemplate?.length === 0 && (
          <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed">
            <p
              className="text-muted-foreground
            "
            >
              Drag and drop elements here
            </p>
          </div>
        )}
        {/* Render email template elements here */}
      </div>
    </div>
  );
}
