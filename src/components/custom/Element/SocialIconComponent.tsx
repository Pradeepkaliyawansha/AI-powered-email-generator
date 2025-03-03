/* eslint-disable @next/next/no-img-element */
import { ElementList } from "@/lib/dto";
import React from "react";

export default function SocialIconComponent(props: Readonly<ElementList>) {
  if (!props?.socialIcons || props.socialIcons.length === 0) {
    return <div>No social icons available</div>;
  }
  return (
    <div style={props?.outerStyle}>
      {props.socialIcons.map((icon, index) => (
        <a
          key={index}
          href={icon.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={icon.icon}
            alt={`social icon ${index + 1}`}
            style={props?.style}
          />
        </a>
      ))}
    </div>
  );
}
