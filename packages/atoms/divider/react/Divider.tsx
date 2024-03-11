
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Divider as DividerElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Divider as DividerElement } from "../src";

export type Props = {
	mode?: "vertical"|"horizontal"; // default-value: horizontal [conditional]
	thickness?: "thin"|"default"|"thick"; // default-value: default [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	mode?: string; // default-value: horizontal [conditional]
	thickness?: string; // default-value: default [conditional]
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