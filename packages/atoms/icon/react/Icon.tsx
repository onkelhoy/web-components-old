
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Icon as IconElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Icon as IconElement } from "../src";

export type Props = {
	container?: "small"|"medium"|"large"|"smaller";
	name?: string;
	color?: string;
	size?: "small"|"medium"|"large"; // default-value: medium [conditional]
	customSize?: number;
	countryFlag?: string;
	assetBase?: string; // default-value: /public [conditional]
	cache?: boolean;
	file?: string;
	url?: string;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	container?: string;
	name?: string;
	color?: string;
	size?: string; // default-value: medium [conditional]
	"custom-size"?: string;
	"country-flag"?: string;
	"asset-base"?: string; // default-value: /public [conditional]
	cache?: string;
	file?: string;
	url?: string;
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