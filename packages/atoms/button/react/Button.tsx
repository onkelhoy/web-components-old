
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Button as ButtonElement } from "../src";
import "../src/register.js";

// exporting
export { Button as ButtonElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  type?: "button" | "submit" | "reset"; // default-value: button
  size?: "small" | "medium" | "large"; // default-value: medium
  radius?: "small" | "medium" | "large" | "none" | "circular"; // default-value: circular
  href?: string; // [conditional]
  circle?: boolean;
  loading?: boolean;
  textvariant?: "B1" | "B2" | "button1" | "button2"; // default-value: B1
  mode?: "hug" | "fill"; // default-value: hug
  variant?: "filled" | "outlined" | "clear"; // default-value: filled
  color?: "primary" | "secondary" | "inverse" | "danger" | "success" | "warning"; // default-value: primary
  defaultValue?: string; // [conditional]
  disabled?: boolean; // [conditional]
  name?: string; // default-value: missing-name
  value?: string; // [conditional]
  onClick?: (e: React.SyntheticEvent<ButtonElement, Event>) => void;
  onChange?: (e: React.SyntheticEvent<ButtonElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
  tabIndex?: number;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  type?: string; // default-value: button
  size?: string; // default-value: medium
  radius?: string; // default-value: circular
  href?: string; // [conditional]
  circle?: string;
  loading?: string;
  "text-variant"?: string; // default-value: B1
  mode?: string; // default-value: hug
  variant?: string; // default-value: filled
  color?: string; // default-value: primary
  "default-value"?: string; // [conditional]
  disabled?: string; // [conditional]
  name?: string; // default-value: missing-name
  value?: string; // [conditional]
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