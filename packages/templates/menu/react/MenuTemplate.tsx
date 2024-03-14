
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { MenuTemplate as MenuTemplateElement } from "../src";
import "../src/register.js";

// exporting
export { MenuTemplate as MenuTemplateElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
	hasitems?: boolean;
	multiple?: boolean;
	closeonselect?: boolean;
	dynamicwidth?: boolean; // default-value: true
	size?: "small"|"medium"|"large"; // default-value: medium
	menuheight?: string; // default-value: 15rem
	revealby?: "hover"|"click"; // default-value: click
	placement?: "top-left"|"top-right"|"top-center"|"bottom-left"|"bottom-right"|"bottom-center"|"left-top"|"left-bottom"|"left-center"|"right-top"|"right-bottom"|"right-center"; // default-value: bottom-center
	hideonoutsideclick?: boolean; // default-value: true
	open?: boolean;
	onSelect?: (e: React.SyntheticEvent<MenuTemplateElement, CustomEvent>) => void; // detail: { value text (note this is early and can be wrong)
	onPreSelect?: (e: React.SyntheticEvent<MenuTemplateElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
	onDeselect?: (e: React.SyntheticEvent<MenuTemplateElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
	onChange?: (e: React.SyntheticEvent<MenuTemplateElement, Event>) => void;
	onShow?: (e: React.SyntheticEvent<MenuTemplateElement, Event>) => void;
	onHide?: (e: React.SyntheticEvent<MenuTemplateElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
	multiple?: string;
	"close-on-select"?: string;
	"dynamic-width"?: string; // default-value: true
	size?: string; // default-value: medium
	"menu-height"?: string; // default-value: 15rem
	revealby?: string; // default-value: click
	placement?: string; // default-value: bottom-center
	hideonoutsideclick?: string; // default-value: true
	open?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<MenuTemplateElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-menu-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-menu-template>
  );
});

export const MenuTemplate = papHOC<MenuTemplateElement, Props, Attributes>(Component);