
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Badge as BadgeElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Badge as BadgeElement } from "../src";

export type Props = {
	count?: number;
	size?: "small"|"medium"|"large"; // default-value: medium [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	count?: string;
	size?: string; // default-value: medium [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<BadgeElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-badge
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-badge>
  );
});

export const Badge = papHOC<BadgeElement, Props, Attributes>(Component);