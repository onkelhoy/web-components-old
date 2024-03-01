
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Item as ItemElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Item as ItemElement } from "../src";

export type ItemProps = {
	size?: "small"|"medium"|"large"; // default-value: medium [conditional]
	divider?: boolean;
	selected?: boolean;
	value?: string;
	radius?: "small"|"medium"|"large"|"none"|"circular"; // default-value: small [conditional]
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none [conditional]
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical [conditional]
	onClick?: (e:Event) => void;
	onSelect?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type ItemAttributes = {
	size?: string; // default-value: medium [conditional]
	divider?: string;
	selected?: string;
	value?: string;
	radius?: string; // default-value: small [conditional]
	elevation?: string; // default-value: none [conditional]
	"elevation-direction"?: string; // default-value: vertical [conditional]
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