import { ElementList } from "@/lib/dto";
import React from "react";

export default function ImageComponent(props: ElementList) {
  return (
    <div>
      <img src={props?.content} style={props?.style} alt="image" />
    </div>
  );
}
