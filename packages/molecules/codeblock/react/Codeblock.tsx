
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Codeblock as CodeblockElement } from "../src";
import "../src/register.js";

// exporting
export { Codeblock as CodeblockElement } from "../src";

export type Props = {
	display?: "both"|"code"; // default-value: code
	direction?: "row"|"column"; // default-value: column
	color?: "canvas"|"background"|"checker"; // default-value: checker
	themetoggle?: boolean; // default-value: true
	lang?: string;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	display?: string; // default-value: code
	direction?: string; // default-value: column
	color?: string; // default-value: checker
	"theme-toggle"?: string; // default-value: true
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