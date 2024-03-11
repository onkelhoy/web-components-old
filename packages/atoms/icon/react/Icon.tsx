
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Icon as IconElement } from "../src";
import "../src/register.js";

// exporting
export { Icon as IconElement } from "../src";

export type Props = {
	container?: "small"|"medium"|"large"|"smaller"; // [conditional]
	name?: string; // [conditional]
	color?: string; // [conditional]
	size?: "small"|"medium"|"large"; // default-value: medium
	customSize?: number; // [conditional]
	countryFlag?: string; // [conditional]
	assetBase?: string; // default-value: /public
	cache?: boolean;
	file?: string;
	url?: string; // [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	container?: string; // [conditional]
	name?: string; // [conditional]
	color?: string; // [conditional]
	size?: string; // default-value: medium
	"custom-size"?: string; // [conditional]
	"country-flag"?: string; // [conditional]
	"asset-base"?: string; // default-value: /public
	cache?: string;
	file?: string;
	url?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<IconElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-icon
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-icon>
  );
});

export const Icon = papHOC<IconElement, Props, Attributes>(Component);