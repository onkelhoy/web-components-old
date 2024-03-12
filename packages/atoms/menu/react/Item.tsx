
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Item as ItemElement } from "../src";
import "../src/register.js";

// exporting
export { Item as ItemElement } from "../src";

export type ItemProps = {
	size?: "small"|"medium"|"large"; // default-value: medium
	divider?: boolean;
	selected?: boolean;
	value?: string;
	radius?: "small"|"medium"|"large"|"none"|"circular"; // default-value: small
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical
	onClick?: (e: React.SyntheticEvent<ItemElement, Event>) => void;
	onSelect?: (e: React.SyntheticEvent<ItemElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type ItemAttributes = {
	size?: string; // default-value: medium
	divider?: string;
	selected?: string;
	value?: string;
	radius?: string; // default-value: small
	elevation?: string; // default-value: none
	"elevation-direction"?: string; // default-value: vertical
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ItemElement, ItemAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-menu-item
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-menu-item>
  );
});

export const Item = papHOC<ItemElement, ItemProps, ItemAttributes>(Component);