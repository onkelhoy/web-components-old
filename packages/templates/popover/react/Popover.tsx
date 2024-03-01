
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Popover as PopoverElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Popover as PopoverElement } from "../src";

export type Props = {
	revealby?: "hover"|"click"; // default-value: hover [conditional]
	placement?: "top-left"|"top-right"|"top-center"|"bottom-left"|"bottom-right"|"bottom-center"|"left-top"|"left-bottom"|"left-center"|"right-top"|"right-bottom"|"right-center"; // default-value: bottom-center [conditional]
	hideonoutsideclick?: boolean; // default-value: true [conditional]
	open?: boolean;
	onShow?: (e:Event) => void;
	onHide?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	revealby?: string; // default-value: hover [conditional]
	placement?: string; // default-value: bottom-center [conditional]
	hideonoutsideclick?: string; // default-value: true [conditional]
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