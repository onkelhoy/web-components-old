
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Divider as DividerElement } from "../src";
import "../src/register.js";

// exporting
export { Divider as DividerElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  mode?: "vertical" | "horizontal"; // default-value: horizontal
  thickness?: "thin" | "default" | "thick"; // default-value: default
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  mode?: string; // default-value: horizontal
  thickness?: string; // default-value: default
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<DividerElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-divider
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-divider>
  );
});

export const Divider = papHOC<DividerElement, Props, Attributes>(Component);