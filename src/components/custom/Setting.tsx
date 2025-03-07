"use client";
import { useSelectedElement } from "@/app/provider";
import { useEmailTemplate } from "@/app/provider";
import React, { useEffect, useState } from "react";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import TextColorField from "./Settings/TextColorField";
import { EmailTemplateType } from "@/lib/dto";
import URLField from "./Settings/UrlField";
import ImageSizeField from "./Settings/ImageSizeField";
import ImagePreview from "./Settings/ImagePreviewField";
import TextAlignField from "./Settings/TextAlignField";

export default function Setting() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const { setEmailTemplate } = useEmailTemplate();
  const [content, setContent] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#000000"); // Default text color
  const [fontSize, setFontSize] = useState<string>("");
  const [textAlign, setTextAlign] = useState<string>("left"); // Default to left align
  const [imageWidth, setImageWidth] = useState<string>("");
  const [imageHeight, setImageHeight] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");

  useEffect(() => {
    // Set initial content when a new element is selected
    if (selectedElement?.elementList?.content) {
      setContent(selectedElement.elementList.content);
    }

    // Set initial background color
    if (selectedElement?.elementList?.style?.backgroundColor) {
      setBackgroundColor(
        String(selectedElement.elementList.style.backgroundColor)
      );
    }

    // Set initial text color
    if (selectedElement?.elementList?.style?.color) {
      setTextColor(String(selectedElement.elementList.style.color));
    } else {
      setTextColor("#000000"); // Default value
    }

    // Set initial font size
    if (selectedElement?.elementList?.style?.fontSize) {
      setFontSize(String(selectedElement.elementList.style.fontSize));
    }

    // Set initial text align
    if (selectedElement?.elementList?.style?.textAlign) {
      setTextAlign(String(selectedElement.elementList.style.textAlign));
    } else {
      setTextAlign("left"); // Default value
    }

    // Set initial image dimensions
    if (selectedElement?.elementList?.style?.width) {
      setImageWidth(String(selectedElement.elementList.style.width));
    }
    if (selectedElement?.elementList?.style?.height) {
      setImageHeight(String(selectedElement.elementList.style.height));
    }

    // Set initial URL
    if (selectedElement?.elementList?.url) {
      setUrl(selectedElement.elementList.url);
    }
    // Set initial image URL and alt text
    if (selectedElement?.elementList?.imageUrl) {
      setImageUrl(selectedElement.elementList.imageUrl);
    }
    if (selectedElement?.elementList?.alt) {
      setImageAlt(selectedElement.elementList.alt);
    }
  }, [selectedElement]);

  const handleContentChange = (value: string) => {
    setContent(value);
    updateTemplate("content", value);
  };

  const handleBackgroundColorChange = (value: string) => {
    setBackgroundColor(value);
    updateTemplate("backgroundColor", value);
  };

  const handleTextColorChange = (value: string) => {
    setTextColor(value);
    updateTemplate("color", value);
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    updateTemplate("fontSize", value);
  };

  const handleTextAlignChange = (value: string) => {
    setTextAlign(value);
    updateTemplate("textAlign", value);
  };

  const handleImageWidthChange = (value: string) => {
    setImageWidth(value);
    updateTemplate("width", value);
  };

  const handleImageHeightChange = (value: string) => {
    setImageHeight(value);
    updateTemplate("height", value);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    updateTemplate("url", value);
  };

  const handleImageUrlChange = (value: string) => {
    setImageUrl(value);
    updateTemplate("imageUrl", value);
  };

  const handleImageAltChange = (value: string) => {
    setImageAlt(value);
    updateTemplate("alt", value);
  };

  const updateTemplate = (fieldName: string, value: string) => {
    if (!selectedElement) return;

    setEmailTemplate((prevTemplate: EmailTemplateType) => {
      // Create a copy of the content array
      const newContent = [...prevTemplate.content];

      // Find the layout item index
      const layoutIndex = newContent.findIndex(
        (item) =>
          typeof item !== "string" && item.id === selectedElement.layoutItem.id
      );

      if (layoutIndex !== -1) {
        // Get the current layout item
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentLayout = newContent[layoutIndex] as any;

        // Update the specific element within the layout
        const updatedElement = {
          ...currentLayout[selectedElement.index],
          ...(fieldName === "content" ? { content: value } : {}),
          ...(fieldName === "url" ? { url: value } : {}),
          ...(fieldName === "imageUrl" ? { imageUrl: value } : {}),
          ...(fieldName === "alt" ? { alt: value } : {}),
          style: {
            ...currentLayout[selectedElement.index].style,
            ...(fieldName === "backgroundColor"
              ? { backgroundColor: value }
              : {}),
            ...(fieldName === "color" ? { color: value } : {}),
            ...(fieldName === "fontSize" ? { fontSize: `${value}` } : {}),
            ...(fieldName === "textAlign" ? { textAlign: value } : {}),
            ...(fieldName === "width" ? { width: value } : {}),
            ...(fieldName === "height" ? { height: value } : {}),
          },
        };

        currentLayout[selectedElement.index] = updatedElement;

        // Update the content array
        newContent[layoutIndex] = currentLayout;
      }

      // Return updated template
      return {
        ...prevTemplate,
        content: newContent,
      };
    });

    // Update the selected element context
    setSelectedElement({
      ...selectedElement,
      elementList: {
        ...selectedElement.elementList,
        ...(fieldName === "content" ? { content: value } : {}),
        ...(fieldName === "url" ? { url: value } : {}),
        ...(fieldName === "imageUrl" ? { imageUrl: value } : {}),
        ...(fieldName === "alt" ? { alt: value } : {}),
        style: {
          ...selectedElement.elementList.style,
          ...(fieldName === "backgroundColor"
            ? { backgroundColor: value }
            : {}),
          ...(fieldName === "color" ? { color: value } : {}),
          ...(fieldName === "fontSize" ? { fontSize: `${value}` } : {}),
          ...(fieldName === "textAlign" ? { textAlign: value } : {}),
          ...(fieldName === "width" ? { width: value } : {}),
          ...(fieldName === "height" ? { height: value } : {}),
        },
      },
    });
  };

  // Check if the element is a text or button element
  const isTextElement = selectedElement?.elementList?.content !== undefined;
  const isButtonElement = selectedElement?.elementList?.type === "button";
  const needsTextColor = isTextElement || isButtonElement;

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Settings</h2>
      {isTextElement && (
        <>
          <InputField
            label="Content"
            value={content}
            onHandleInputChange={handleContentChange}
          />
          <TextAlignField
            label="Text Alignment"
            value={textAlign}
            onHandleInputChange={handleTextAlignChange}
          />
        </>
      )}
      {needsTextColor && (
        <TextColorField
          label="Text Color"
          value={textColor}
          onHandleInputChange={handleTextColorChange}
        />
      )}
      {selectedElement?.elementList?.style?.backgroundColor !== undefined && (
        <ColorPickerField
          label="Background Color"
          value={backgroundColor}
          onHandleInputChange={handleBackgroundColorChange}
        />
      )}
      {selectedElement?.elementList?.style?.fontSize && (
        <InputField
          label="Font Size"
          value={fontSize}
          onHandleInputChange={handleFontSizeChange}
        />
      )}
      {selectedElement?.elementList?.imageUrl !== undefined && (
        <>
          <ImageSizeField
            label="Image Width"
            value={imageWidth}
            onHandleInputChange={handleImageWidthChange}
          />
          <ImageSizeField
            label="Image Height"
            value={imageHeight}
            onHandleInputChange={handleImageHeightChange}
          />
          <ImagePreview
            src={imageUrl}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            onImageUrlChange={handleImageUrlChange}
          />
          <InputField
            label="Image Alt Text"
            value={imageAlt}
            onHandleInputChange={handleImageAltChange}
          />
        </>
      )}
      {selectedElement?.elementList?.url !== undefined && (
        <URLField
          label="URL"
          value={url}
          onHandleInputChange={handleUrlChange}
        />
      )}
    </div>
  );
}
