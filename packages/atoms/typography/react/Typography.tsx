
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Typography as TypographyElement } from "../src";
import "../src/register.js";

// exporting
export { Typography as TypographyElement } from "../src";

export type Props = {
	variant?: "C1"|"C2"|"T1"|"T2"|"H1"|"H2"|"copy1"|"copy2"|"title1"|"title2"|"heading1"|"heading2"|"B1"|"B2"|"button1"|"button2"|"C3"|"C4"|"T3"|"T4"|"H3"|"H4"|"copy3"|"copy4"|"title3"|"title4"|"heading3"|"heading4"|"H5"; // default-value: C3
	align?: "center"|"justify"|"start"|"end"|"left"|"right"|"unset"|"inherit"|"initial"; // default-value: initial
	nowrap?: boolean;
	truncate?: boolean;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	variant?: string; // default-value: C3
	align?: string; // default-value: initial
	nowrap?: string;
	truncate?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<TypographyElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-typography
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-typography>
  );
});

export const Typography = papHOC<TypographyElement, Props, Attributes>(Component);