
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Input as InputElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Input as InputElement } from "../src";

export type Props = {
  counter?: boolean;
  type?: "number" | "email" | "tel" | "text" | "password" | "search" | "url" | "color"; // default-value: text [conditional]
  maxlength?: number;
  minlength?: number;
  max?: number;
  min?: number;
  pattern?: string;
  customDanger?: Partial<Record<keyof ValidityState, string>>;
  customWarning?: Partial<Record<keyof ValidityState, string>>;
  customValidation?: (target: InputElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
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
  onInput?: (e: Event) => void;
  onChange?: (e: Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
  counter?: string;
  type?: string; // default-value: text [conditional]
  maxlength?: string;
  minlength?: string;
  max?: string;
  min?: string;
  pattern?: string;
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

const Component = React.forwardRef<InputElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-input
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-input>
  );
});

export const Input = papHOC<InputElement, Props, Attributes>(Component);