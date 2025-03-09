"use client";
import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSideBar from "@/components/custom/ElementSideBar";
import Setting from "@/components/custom/Setting";
import React, { useState } from "react";

export default function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState<boolean>(false);
  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />
      <div className="grid grid-cols-5">
        <ElementSideBar />
        <div className="col-span-3 bg-gray-100 dark:bg-black">
          <Canvas
            viewHTMLCode={viewHTMLCode}
            closeDialog={() => {
              setViewHTMLCode(false);
            }}
          />
        </div>
        <Setting />
      </div>
    </div>
  );
}
