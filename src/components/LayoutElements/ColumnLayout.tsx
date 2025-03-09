"use client";
import {
  useDragElementLayout,
  useEmailTemplate,
  useSelectedElement,
} from "@/app/provider";
import {
  DragOverState,
  ElementList,
  EmailTemplateType,
  ExtendedLayoutItem,
  LayoutItem,
} from "@/lib/dto";
import React, { useState } from "react";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import SocialIconComponent from "../custom/Element/SocialIconComponent";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

export default function ColumnLayout(layoutItem: Readonly<LayoutItem>) {
  const { setEmailTemplate } = useEmailTemplate();
  const { dragDropState } = useDragElementLayout();
  const [dragOver, setDragOver] = useState<DragOverState | undefined>();
  const { selectedElement, setSelectedElement } = useSelectedElement();

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
    setDragOver(undefined);
  };

  const getElementComponent = (element: ElementList | undefined) => {
    if (!element) return null;
    if (element?.type == "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type == "Text") {
      return <TextComponent {...element} />;
    } else if (element?.type == "Image") {
      return <ImageComponent {...element} />;
    } else if (element?.type == "Logo") {
      return <LogoComponent {...element} />;
    } else if (element?.type == "Divider") {
      return <DividerComponent {...element} />;
    } else if (element?.type == "SocialIcons") {
      return <SocialIconComponent {...element} />;
    }
    return element?.type;
  };

  const extendedLayoutItem = layoutItem as ExtendedLayoutItem;

  const deleteLayoutItem = (layoutId: number) => {
    setEmailTemplate((prevTemplate: EmailTemplateType) => {
      const updatedContent = prevTemplate.content.filter(
        (item) => typeof item !== "string" && item.id !== layoutId
      );

      return {
        ...prevTemplate,
        content: updatedContent,
      };
    });

    setSelectedElement(null);
  };

  const moveItemUp = (layoutId: number) => {
    setEmailTemplate((prevTemplate: EmailTemplateType) => {
      const newContent = [...prevTemplate.content];

      // Find the index of the current layout item
      const currentIndex = newContent.findIndex(
        (item) => typeof item !== "string" && item.id === layoutId
      );

      // If it's already at the top or not found, do nothing
      if (currentIndex <= 0) return prevTemplate;

      // Find the previous non-string item
      let prevIndex = currentIndex - 1;
      while (prevIndex >= 0 && typeof newContent[prevIndex] === "string") {
        prevIndex--;
      }

      // If there's no previous item that's not a string, return unchanged
      if (prevIndex < 0) return prevTemplate;

      // Swap the items
      [newContent[prevIndex], newContent[currentIndex]] = [
        newContent[currentIndex],
        newContent[prevIndex],
      ];

      return {
        ...prevTemplate,
        content: newContent,
      };
    });
  };

  const moveItemDown = (layoutId: number) => {
    setEmailTemplate((prevTemplate: EmailTemplateType) => {
      const newContent = [...prevTemplate.content];

      // Find the index of the current layout item
      const currentIndex = newContent.findIndex(
        (item) => typeof item !== "string" && item.id === layoutId
      );

      // If it's not found or already at the bottom, do nothing
      if (currentIndex === -1 || currentIndex >= newContent.length - 1)
        return prevTemplate;

      // Find the next non-string item
      let nextIndex = currentIndex + 1;
      while (
        nextIndex < newContent.length &&
        typeof newContent[nextIndex] === "string"
      ) {
        nextIndex++;
      }

      // If there's no next item that's not a string, return unchanged
      if (nextIndex >= newContent.length) return prevTemplate;

      // Swap the items
      [newContent[currentIndex], newContent[nextIndex]] = [
        newContent[nextIndex],
        newContent[currentIndex],
      ];

      return {
        ...prevTemplate,
        content: newContent,
      };
    });
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layoutItem?.numOfCol || 1},1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layoutItem.id == layoutItem.id ? "border border-dashed border-green-500" : ""}`}
      >
        {Array.from({ length: layoutItem?.numOfCol || 1 }).map((_, index) => (
          <div
            className={`text-black p-2 flex items-center justify-center cursor-pointer
              ${!extendedLayoutItem[index]?.type ? "bg-green-100 border border-dashed" : ""}
              ${selectedElement?.layoutItem.id == layoutItem.id && selectedElement?.index == index ? "border-green-600 border-4" : ""}
              ${index === dragOver?.index && dragOver?.columnId === layoutItem?.id ? "bg-green-500" : ""}`}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() =>
              setSelectedElement({
                layoutItem: layoutItem,
                elementList: extendedLayoutItem[index] || ({} as ElementList),
                index: index,
              })
            }
            key={index}
          >
            {getElementComponent((layoutItem as ExtendedLayoutItem)?.[index]) ??
              "Drag Element Here"}
          </div>
        ))}
        {selectedElement?.layoutItem.id == layoutItem.id && (
          <div className="absolute -right-10 flex gap-2 flex-col">
            <div
              className=" bg-green-100 p-2 hover:scale-105 hover:shadow-md transition-all rounded-full cursor-pointer"
              onClick={() => {
                deleteLayoutItem(layoutItem?.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500 " />
            </div>
            <div
              className=" bg-green-100 p-2 hover:scale-105 hover:shadow-md transition-all rounded-full cursor-pointer"
              onClick={() => {
                moveItemUp(layoutItem?.id);
              }}
            >
              <ArrowUp className="h-4 w-4 text-red-500 " />
            </div>
            <div
              className=" bg-green-100 p-2 hover:scale-105 hover:shadow-md transition-all rounded-full cursor-pointer"
              onClick={() => {
                moveItemDown(layoutItem?.id);
              }}
            >
              <ArrowDown className="h-4 w-4 text-red-500 " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
