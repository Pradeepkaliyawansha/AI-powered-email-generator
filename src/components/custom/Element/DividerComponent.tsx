import { ElementList } from "@/lib/dto";
import React from "react";

export default function DividerComponent(props: Readonly<ElementList>) {
  return <hr style={props?.style} />;
}
