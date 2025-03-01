"use client";
import React from "react";
import Layout from "../../../Data/Layout";
import ElementLayoutCard from "./ElementLayoutCard";
import elementList from "../../../Data/ElementList";
import { DragDropLayoutElementType, ElementList, LayoutItem } from "@/lib/dto";
import { useDragElementLayout } from "@/app/provider";

export default function ElementSideBar() {
  const { setDragDropState } = useDragElementLayout();

  const onDragLayoutStart = (layoutItems: LayoutItem) => {
    if (!layoutItems) return;
    setDragDropState(
      (prevState: DragDropLayoutElementType): DragDropLayoutElementType => ({
        elementList: prevState.elementList || [],
        layoutItems: prevState.layoutItems || [],
        isDragging: true,
        dargLayout: {
          ...layoutItems,
          id: Date.now(),
        },
      })
    );
  };

  const onDragElementStart = (elementList: ElementList) => {
    if (!elementList) return;
    setDragDropState(
      (prevState: DragDropLayoutElementType): DragDropLayoutElementType => ({
        elementList: prevState.elementList || [],
        layoutItems: prevState.layoutItems || [],
        isDragging: true,
        dragElement: {
          ...elementList,
          id: Date.now(),
        },
      })
    );
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-lg">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Layout.map((layoutItems, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onDragLayoutStart(layoutItems)}
          >
            <ElementLayoutCard layoutItems={layoutItems} />
          </div>
        ))}
      </div>
      <h2 className="font-bold text-lg mt-6">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {elementList.map((element, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onDragElementStart(element)}
          >
            <ElementLayoutCard elementList={element} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
