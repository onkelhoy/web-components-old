
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Button as ButtonElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Button as ButtonElement } from "../src";

export type Props = {
	type?: "button"|"submit"|"reset"; // default-value: button [conditional]
	size?: "small"|"medium"|"large"; // default-value: medium [conditional]
	radius?: "small"|"medium"|"large"|"none"|"circular"; // default-value: circular [conditional]
	href?: string;
	circle?: boolean;
	loading?: boolean;
	textvariant?: "B1"|"B2"|"button1"|"button2"; // default-value: B1 [conditional]
	mode?: "hug"|"fill"; // default-value: hug [conditional]
	variant?: "filled"|"outlined"|"clear"; // default-value: filled [conditional]
	color?: "primary"|"secondary"|"inverse"|"danger"|"success"|"warning"; // default-value: primary [conditional]
	defaultValue?: string;
	disabled?: boolean;
	name?: string; // default-value: missing-name [conditional]
	value?: string;
	onClick?: (e:Event) => void;
	onChange?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	type?: string; // default-value: button [conditional]
	size?: string; // default-value: medium [conditional]
	radius?: string; // default-value: circular [conditional]
	href?: string;
	circle?: string;
	loading?: string;
	"text-variant"?: string; // default-value: B1 [conditional]
	mode?: string; // default-value: hug [conditional]
	variant?: string; // default-value: filled [conditional]
	color?: string; // default-value: primary [conditional]
	"default-value"?: string;
	disabled?: string;
	name?: string; // default-value: missing-name [conditional]
	value?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ButtonElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-button
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-button>
  );
});

export const Button = papHOC<ButtonElement, Props, Attributes>(Component);