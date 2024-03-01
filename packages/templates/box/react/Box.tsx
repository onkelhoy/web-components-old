
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Box as BoxElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Box as BoxElement } from "../src";

export type Props = {
	radius?: "none"|"small"|"medium"|"large"|"circular"; // default-value: circular [conditional]
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none [conditional]
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	radius?: string; // default-value: circular [conditional]
	elevation?: string; // default-value: none [conditional]
	"elevation-direction"?: string; // default-value: vertical [conditional]
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