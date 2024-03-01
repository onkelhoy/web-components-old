
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Item as ItemElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Item as ItemElement } from "../src";

export type ItemProps = {
	icon?: string;
	icon_selected?: string;
	text?: string;
	counter?: number;
	isparent?: boolean;
	indicator?: boolean;
	static?: boolean;
	open?: boolean; // default-value: true [conditional]
	onReachedMax?: (e:Event) => void;
	onReachedMax?: (e:Event) => void;
	onChildSelect?: (e:CustomEvent) => void; // detail: {  (note this is early and can be wrong)
	onSelect?: (e:Event) => void;
	onChildSelect?: (e:CustomEvent) => void; // detail: {  (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type ItemAttributes = {
	icon?: string;
	icon_selected?: string;
	text?: string;
	counter?: string;
	isparent?: string;
	indicator?: string;
	static?: string;
	open?: string; // default-value: true [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ItemElement, ItemAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-sidebar-item
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-sidebar-item>
  );
});

export const Item = papHOC<ItemElement, ItemProps, ItemAttributes>(Component);