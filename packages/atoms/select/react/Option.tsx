
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Option as OptionElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Option as OptionElement } from "../src";

export type OptionProps = {
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
export type OptionAttributes = {
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

const Component = React.forwardRef<OptionElement, OptionAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-option
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-option>
  );
});

export const Option = papHOC<OptionElement, OptionProps, OptionAttributes>(Component);