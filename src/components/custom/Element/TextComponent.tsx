import { ElementList } from "@/lib/dto";
import React from "react";

export default function TextComponent(props: Readonly<ElementList>) {
  return (
    <div>
      <h2 style={props?.style}>{props?.content}</h2>
    </div>
  );
}
