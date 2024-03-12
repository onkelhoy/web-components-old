
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Popover as PopoverElement } from "../src";
import "../src/register.js";

// exporting
export { Popover as PopoverElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  revealby?: "hover" | "click"; // default-value: hover
  placement?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center" | "left-top" | "left-bottom" | "left-center" | "right-top" | "right-bottom" | "right-center"; // default-value: bottom-center
  hideonoutsideclick?: boolean; // default-value: true
  open?: boolean;
  onShow?: (e: React.SyntheticEvent<PopoverElement, Event>) => void;
  onHide?: (e: React.SyntheticEvent<PopoverElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  revealby?: string; // default-value: hover
  placement?: string; // default-value: bottom-center
  hideonoutsideclick?: string; // default-value: true
  open?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<PopoverElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-popover-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-popover-template>
  );
});

export const Popover = papHOC<PopoverElement, Props, Attributes>(Component);