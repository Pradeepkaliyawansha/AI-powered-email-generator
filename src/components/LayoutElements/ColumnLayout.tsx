"use client";
import { useDragElementLayout, useEmailTemplate } from "@/app/provider";
import {
  DragOverState,
  ElementList,
  EmailTemplateType,
  LayoutItem,
} from "@/lib/dto";
import React, { useState } from "react";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";

interface ExtendedLayoutItem extends LayoutItem {
  [key: number]: ElementList;
}

export default function ColumnLayout(layoutItem: Readonly<LayoutItem>) {
  const { setEmailTemplate } = useEmailTemplate();
  const { dragDropState } = useDragElementLayout();
  const [dragOver, setDragOver] = useState<DragOverState | undefined>();

  const onDragOverHandle = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layoutItem?.id,
    });
  };

  const onDropHandle = () => {
    if (!dragOver) return;
    const index = dragOver.index;

    setEmailTemplate((prevTemplate: EmailTemplateType) => {
      // Create a new content array with the updated item
      const newContent = [...prevTemplate.content];

      // Find the index of the current layout item in the content array
      const layoutIndex = newContent.findIndex(
        (item) => typeof item !== "string" && item.id === layoutItem.id
      );

      if (layoutIndex !== -1) {
        // Create a new layout item with the dragged element at the specified index
        const updatedLayout = {
          ...(newContent[layoutIndex] as LayoutItem),
          [index]: dragDropState?.dragElement,
        };

        // Update the content array with the new layout item
        newContent[layoutIndex] = updatedLayout;
      }

      // Return the updated template
      return {
        ...prevTemplate,
        content: newContent,
      };
    });
  };

  const getElementComponent = (element: ElementList | undefined) => {
    if (!element) return null;
    console.log(element);
    if (element?.type == "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type == "Text") {
      return <TextComponent {...element} />;
    } else if (element?.type == "Image") {
      return <ImageComponent {...element} />;
    }
    return element?.type;
  };

  const extendedLayoutItem = layoutItem as ExtendedLayoutItem;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layoutItem?.numOfCol || 1},1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layoutItem?.numOfCol || 1 }).map((_, index) => (
          <div
            className={`text-black p-2 flex items-center justify-center
              ${!extendedLayoutItem[index]?.type ? "bg-green-100 border border-dashed" : ""}
              ${index === dragOver?.index && dragOver?.columnId === layoutItem?.id ? "bg-green-500" : ""}`}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            key={index}
          >
            {getElementComponent((layoutItem as ExtendedLayoutItem)?.[index]) ??
              "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
}
