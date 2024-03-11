
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Menu as MenuElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Menu as MenuElement } from "../src";

export type Props = {
	buttonVariant?: "filled"|"outlined"|"clear"; // default-value: clear [conditional]
	buttonColor?: "primary"|"secondary"|"inverse"|"danger"|"success"|"warning"; // default-value: secondary [conditional]
	buttonRadius?: "none"|"small"|"medium"|"large"|"circular"; // default-value: medium [conditional]
	hasitems?: boolean;
	multiple?: boolean;
	closeonselect?: boolean;
	dynamicwidth?: boolean; // default-value: true [conditional]
	size?: "small"|"medium"|"large"; // default-value: medium [conditional]
	menuheight?: string; // default-value: 15rem [conditional]
	revealby?: "hover"|"click"; // default-value: hover [conditional]
	placement?: "top-left"|"top-right"|"top-center"|"bottom-left"|"bottom-right"|"bottom-center"|"left-top"|"left-bottom"|"left-center"|"right-top"|"right-bottom"|"right-center"; // default-value: bottom-center [conditional]
	hideonoutsideclick?: boolean; // default-value: true [conditional]
	open?: boolean;
	onSelect?: (e:CustomEvent) => void; // detail: { value text (note this is early and can be wrong)
	onPreSelect?: (e:CustomEvent) => void; // detail: {  (note this is early and can be wrong)
	onDeselect?: (e:CustomEvent) => void; // detail: {  (note this is early and can be wrong)
	onChange?: (e:Event) => void;
	onShow?: (e:Event) => void;
	onHide?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	buttonVariant?: string; // default-value: clear [conditional]
	buttonColor?: string; // default-value: secondary [conditional]
	buttonRadius?: string; // default-value: medium [conditional]
	multiple?: string;
	"close-on-select"?: string;
	"dynamic-width"?: string; // default-value: true [conditional]
	size?: string; // default-value: medium [conditional]
	"menu-height"?: string; // default-value: 15rem [conditional]
	revealby?: string; // default-value: hover [conditional]
	placement?: string; // default-value: bottom-center [conditional]
	hideonoutsideclick?: string; // default-value: true [conditional]
	open?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<MenuElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-menu
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-menu>
  );
});

export const Menu = papHOC<MenuElement, Props, Attributes>(Component);