
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Option as OptionElement } from "../src";
import "../src/register.js";

// exporting
export { Option as OptionElement } from "../src";

export type OptionProps = {
	size?: "small"|"medium"|"large"; // default-value: medium
	divider?: boolean;
	selected?: boolean;
	value?: string;
	radius?: "small"|"medium"|"large"|"none"|"circular"; // default-value: small
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical
	onClick?: (e: React.SyntheticEvent<OptionElement, Event>) => void;
	onSelect?: (e: React.SyntheticEvent<OptionElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type OptionAttributes = {
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