"use client";
import { useSelectedElement } from "@/app/provider";
import React, { useEffect, useState } from "react";
import InputField from "./Settings/InputField";

export default function Setting() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = useState<string>("");

  useEffect(() => {
    if (selectedElement?.layoutItem && selectedElement.layoutItem.label) {
      setElement(
        selectedElement.elementList?.label ||
          selectedElement.layoutItem.label ||
          ""
      );
    }
  }, [selectedElement]);

  const handleInputChange = (fieldName: string, value: string) => {
    setElement(value);

    if (selectedElement) {
      // Create a new object with updated content
      const updatedSelectedElement = {
        ...selectedElement,
        elementList: {
          ...selectedElement.elementList,
          content: value,
        },
      };

      setSelectedElement(updatedSelectedElement);
    }
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Settings</h2>
      {selectedElement?.elementList?.content && (
        <InputField
          label="Content"
          value={selectedElement?.elementList?.content}
          onHandleInputChange={(value) => handleInputChange("label", value)}
          type="text"
          style={selectedElement?.elementList?.style}
          icon={selectedElement?.elementList?.icon}
        />
      )}
    </div>
  );
}
