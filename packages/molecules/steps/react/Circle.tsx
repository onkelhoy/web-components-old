
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Circle as CircleElement } from "../src";
import "../src/register.js";

// exporting
export { Circle as CircleElement } from "../src";

export type CircleProps = {
	status?: "complete"|"active"|"incomplete"; // default-value: incomplete
  children?: React.ReactNode;
  className?: string;
};
export type CircleAttributes = {
	status?: string; // default-value: incomplete
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<CircleElement, CircleAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-circle
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-circle>
  );
});

export const Circle = papHOC<CircleElement, CircleProps, CircleAttributes>(Component);