
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Switch as SwitchElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Switch as SwitchElement } from "../src";

export type Props = {
  supportlabel?: string;
  checked?: boolean;
  customDanger?: Partial<Record<keyof ValidityState, string>>;
  customWarning?: Partial<Record<keyof ValidityState, string>>;
  customValidation?: (field: SwitchElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  size?: "small" | "medium" | "large"; // default-value: medium
  mode?: "hug" | "fill"; // default-value: fill
  radius?: "small" | "medium" | "large" | "none" | "circular"; // default-value: medium
  state?: "default" | "info" | "success" | "warning" | "danger"; // default-value: default
  message?: string;
  header?: boolean;
  footer?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  name?: string; // default-value: missing-name [conditional]
  value?: string;
  onChange?: (e: Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
  "support-label"?: string;
  checked?: string;
  "custom-error"?: string;
  "custom-warning"?: string;
  label?: string;
  required?: string;
  readonly?: string;
  placeholder?: string;
  size?: string; // default-value: medium
  mode?: string; // default-value: fill
  radius?: string; // default-value: medium
  state?: string; // default-value: default
  message?: string;
  header?: string;
  footer?: string;
  "default-value"?: string;
  disabled?: string;
  name?: string; // default-value: missing-name [conditional]
  value?: string;
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