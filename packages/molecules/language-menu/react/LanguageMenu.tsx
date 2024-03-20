
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { LanguageMenu as LanguageMenuElement } from "../src";
import "../src/register.js";

// exporting
export { LanguageMenu as LanguageMenuElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
	languages?: Array<any>;
	placement?: "top-left"|"top-right"|"top-center"|"bottom-left"|"bottom-right"|"bottom-center"|"left-top"|"left-bottom"|"left-center"|"right-top"|"right-bottom"|"right-center"; // default-value: bottom-right
	border?: boolean; // [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
	placement?: string; // default-value: bottom-right
	border?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<LanguageMenuElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-language-menu
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-language-menu>
  );
});

export const LanguageMenu = papHOC<LanguageMenuElement, Props, Attributes>(Component);