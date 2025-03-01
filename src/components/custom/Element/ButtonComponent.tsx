import { ElementList } from "@/lib/dto";
import React from "react";

export default function ButtonComponent(props: Readonly<ElementList>) {
  return (
    <div>
      <a href="">
        <button style={props.style}>{props.content}</button>
      </a>
    </div>
  );
}
