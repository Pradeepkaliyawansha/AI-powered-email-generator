import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSideBar from "@/components/custom/ElementSideBar";
import Setting from "@/components/custom/Setting";
import React from "react";

export default function Editor() {
  return (
    <div>
      <EditorHeader />
      <div className="grid grid-cols-5">
        <ElementSideBar />
        <div className="col-span-3 bg-gray-100 dark:bg-black">
          <Canvas />
        </div>
        <Setting />
      </div>
    </div>
  );
}
