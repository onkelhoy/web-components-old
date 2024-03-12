
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Switch as SwitchElement } from "../src";
import "../src/register.js";

// exporting
export { Switch as SwitchElement } from "../src";

export type Props = {
  supportlabel?: string; // [conditional]
  checked?: boolean;
  customDanger?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customWarning?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customValidation?: (target: SwitchElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
  label?: string; // [conditional]
  required?: boolean; // [conditional]
  readonly?: boolean; // [conditional]
  placeholder?: string; // [conditional]
  size?: "small" | "medium" | "large"; // default-value: medium [conditional]
  mode?: "hug" | "fill"; // default-value: fill [conditional]
  radius?: "small" | "medium" | "large" | "none" | "circular"; // default-value: medium [conditional]
  state?: "default" | "info" | "success" | "warning" | "danger"; // default-value: default [conditional]
  message?: string; // [conditional]
  header?: boolean;
  footer?: boolean;
  defaultValue?: string; // [conditional]
  disabled?: boolean; // [conditional]
  name?: string; // default-value: missing-name
  value?: string; // [conditional]
  onChange?: (e: React.SyntheticEvent<SwitchElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
  "support-label"?: string; // [conditional]
  checked?: string;
  "custom-error"?: string; // [conditional]
  "custom-warning"?: string; // [conditional]
  label?: string; // [conditional]
  required?: string; // [conditional]
  readonly?: string; // [conditional]
  placeholder?: string; // [conditional]
  size?: string; // default-value: medium [conditional]
  mode?: string; // default-value: fill [conditional]
  radius?: string; // default-value: medium [conditional]
  state?: string; // default-value: default [conditional]
  message?: string; // [conditional]
  header?: string;
  footer?: string;
  "default-value"?: string; // [conditional]
  disabled?: string; // [conditional]
  name?: string; // default-value: missing-name
  value?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<SwitchElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-switch
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-switch>
  );
});

export const Switch = papHOC<SwitchElement, Props, Attributes>(Component);