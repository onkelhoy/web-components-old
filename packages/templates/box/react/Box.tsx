
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Box as BoxElement } from "../src";
import "../src/register.js";

// exporting
export { Box as BoxElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  radius?: "none" | "small" | "medium" | "large" | "circular"; // default-value: circular
  elevation?: "none" | "small" | "medium" | "large" | "x-large"; // default-value: none
  elevationdirection?: "vertical" | "horizontal"; // default-value: vertical
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  radius?: string; // default-value: circular
  elevation?: string; // default-value: none
  "elevation-direction"?: string; // default-value: vertical
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<BoxElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-box-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-box-template>
  );
});

export const Box = papHOC<BoxElement, Props, Attributes>(Component);