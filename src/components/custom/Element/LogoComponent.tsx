import { ElementList } from "@/lib/dto";
import React from "react";

export default function LogoComponent(props: Readonly<ElementList>) {
  return <img src={props?.imageUrl} alt="logo" style={props?.outerStyle} />;
}
