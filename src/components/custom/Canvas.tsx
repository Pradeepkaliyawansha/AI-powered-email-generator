"use client";

import {
  useDragElementLayout,
  useEmailTemplate,
  useScreenSize,
} from "@/app/provider";
import { CanvasProps, EmailTemplateType, LayoutItem } from "@/lib/dto";
import { cn } from "@/lib/utils";
import React, { useState, DragEvent, useRef, useEffect } from "react";
import ColumnLayout from "../LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";

export default function Canvas({ viewHTMLCode, closeDialog }: CanvasProps) {
  const htmlRef = useRef<HTMLDivElement>(null);
  const { screenSize } = useScreenSize();
  const { dragDropState } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [htmlCode, setHtmlCode] = useState<string>("");

  useEffect(() => {
    // Debug: Log the email template data
    console.log("Current email template:", emailTemplate);
    console.log("Template content:", emailTemplate?.content);
    console.log("Is content an array?", Array.isArray(emailTemplate?.content));
    console.log("Content length:", emailTemplate?.content?.length);
  }, [emailTemplate]);

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
      setEmailTemplate((prev: EmailTemplateType) => {
        // Create a new content array with proper typing
        const newContent = Array.isArray(prev.content)
          ? [...prev.content, dragDropState.dargLayout as unknown as LayoutItem]
          : [dragDropState.dargLayout as unknown as LayoutItem];

        return {
          ...prev,
          content: newContent,
          length: newContent.length,
        };
      });
    }
  };

  const getLayoutComponent = (layoutItem: LayoutItem) => {
    if (layoutItem?.type === "column") {
      return <ColumnLayout {...layoutItem} />;
    }
    return null;
  };

  const getHTMLCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML;
      setHtmlCode(htmlContent);
    }
  };

  useEffect(() => {
    if (viewHTMLCode) {
      getHTMLCode();
    }
  }, [viewHTMLCode]);

  // Ensure content is an array before rendering
  const renderContent = () => {
    const content = emailTemplate?.content;

    if (!content || !Array.isArray(content)) {
      console.error("Invalid content:", content);
      return (
        <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed">
          <p className="text-muted-foreground">Invalid template data</p>
        </div>
      );
    }

    if (content.length === 0) {
      return (
        <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed">
          <p className="text-muted-foreground">Drag and drop elements here</p>
        </div>
      );
    }

    return content.map((layoutItem, index) => {
      // Ensure layoutItem is a proper LayoutItem object
      if (typeof layoutItem === "string" || !layoutItem.type) {
        console.error("Invalid layout item:", layoutItem);
        return null;
      }

      return (
        <div key={index}>{getLayoutComponent(layoutItem as LayoutItem)}</div>
      );
    });
  };

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={cn(
          "w-full bg-white p-6 dark:bg-gray-600",
          screenSize.isDesktop ? "max-w-2xl" : "max-w-md",
          dragOver ? "bg-green-300" : ""
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropHandle}
        aria-label="Email template canvas"
        role="region"
        ref={htmlRef}
      >
        {renderContent()}
      </div>
      <ViewHtmlDialog
        openDialog={viewHTMLCode}
        htmlCode={htmlCode}
        closeDialog={closeDialog}
      />
    </div>
  );
}
