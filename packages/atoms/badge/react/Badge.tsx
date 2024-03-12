
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Badge as BadgeElement } from "../src";
import "../src/register.js";

// exporting
export { Badge as BadgeElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  count?: number;
  size?: "small" | "medium" | "large"; // default-value: medium
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  count?: string;
  size?: string; // default-value: medium
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