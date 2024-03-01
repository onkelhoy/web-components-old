
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Codeblock as CodeblockElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Codeblock as CodeblockElement } from "../src";

export type Props = {
	display?: "both"|"code"; // default-value: code [conditional]
	direction?: "row"|"column"; // default-value: column [conditional]
	color?: "canvas"|"background"; // default-value: canvas [conditional]
	themetoggle?: boolean; // default-value: true [conditional]
	lang?: string;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	display?: string; // default-value: code [conditional]
	direction?: string; // default-value: column [conditional]
	color?: string; // default-value: canvas [conditional]
	"theme-toggle"?: string; // default-value: true [conditional]
	lang?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<CodeblockElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-codeblock
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-codeblock>
  );
});

export const Codeblock = papHOC<CodeblockElement, Props, Attributes>(Component);