
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Tooltip as TooltipElement } from "../src";
import "../src/register.js";

// exporting
export { Tooltip as TooltipElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  placement?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center" | "left-top" | "left-bottom" | "left-center" | "right-top" | "right-bottom" | "right-center"; // default-value: top-center
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  placement?: string; // default-value: top-center
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<TooltipElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-tooltip
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-tooltip>
  );
});

export const Tooltip = papHOC<TooltipElement, Props, Attributes>(Component);