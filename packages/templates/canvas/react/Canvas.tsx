
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Canvas as CanvasElement } from "../src";
import "../src/register.js";

// exporting
export { Canvas as CanvasElement } from "../src";

export type Props = {
	width?: number; // default-value: 100
	height?: number; // default-value: 100
	paused?: boolean;
	scope?: string; // [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	width?: string; // default-value: 100
	height?: string; // default-value: 100
	paused?: string;
	scope?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<CanvasElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-canvas-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-canvas-template>
  );
});

export const Canvas = papHOC<CanvasElement, Props, Attributes>(Component);