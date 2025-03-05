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
            className={`text-black p-2 flex items-center justify-center cursor-pointer
              ${!extendedLayoutItem[index]?.type ? "bg-green-100 border border-dashed" : ""}
              ${selectedElement?.layoutItem.id == layoutItem.id && selectedElement?.index == index ? "border-blue-600 border" : ""}
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
      </div>
    </div>
  );
}
