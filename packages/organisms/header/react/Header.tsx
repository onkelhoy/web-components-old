
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Header as HeaderElement } from "../src";
import "../src/register.js";

// exporting
export { Header as HeaderElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
	user?: object; // [conditional]
	themeMode?: boolean; // default-value: true [conditional]
	themeMenu?: boolean; // default-value: true [conditional]
	language?: boolean; // default-value: true [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
	user?: string; // [conditional]
	"theme-mode"?: string; // default-value: true [conditional]
	"theme-menu"?: string; // default-value: true [conditional]
	language?: string; // default-value: true [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<HeaderElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-header
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-header>
  );
});

export const Header = papHOC<HeaderElement, Props, Attributes>(Component);