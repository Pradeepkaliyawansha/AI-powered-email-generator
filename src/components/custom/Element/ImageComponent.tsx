import { ElementList } from "@/lib/dto";
import React from "react";

export default function ImageComponent(props: ElementList) {
  return (
    <div style={props.outerStyle}>
      <img src={props?.imageUrl} style={props?.style} alt="image" />
    </div>
  );
}
