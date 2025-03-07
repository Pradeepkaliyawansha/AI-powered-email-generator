import { ImagePreviewProps } from "@/lib/dto";
import React, { useState } from "react";

export default function ImagePreview({
  src,
  alt,
  width,
  height,
  onImageUrlChange,
}: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>(src || "");
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setImageUrl(newUrl);
    setImageError(false);
    if (onImageUrlChange) {
      onImageUrlChange(newUrl);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="mb-4">
      <div className="block text-sm font-medium text-gray-700 mb-2">
        Image Preview
      </div>
      <div className="mb-3">
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image URL
        </label>
        <div className="flex gap-2">
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter image URL"
          />
        </div>
      </div>
      <div className="border border-gray-200 rounded-md p-2 flex items-center justify-center bg-gray-50 min-h-[200px]">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={alt || "Preview"}
            style={{
              width: width || "auto",
              height: height || "auto",
              maxWidth: "100%",
              maxHeight: "200px",
              objectFit: "contain",
            }}
            onError={handleImageError}
          />
        ) : imageError ? (
          <div className="text-red-500 text-center py-8">
            Failed to load image
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8">
            No image source provided
          </div>
        )}
      </div>
    </div>
  );
}
