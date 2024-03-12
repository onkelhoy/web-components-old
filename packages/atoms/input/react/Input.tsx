
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Input as InputElement } from "../src";
import "../src/register.js";

// exporting
export { Input as InputElement } from "../src";

export type Props = {
  counter?: boolean; // [conditional]
  type?: "number" | "email" | "tel" | "text" | "password" | "search" | "url" | "color"; // default-value: text
  maxlength?: number; // [conditional]
  minlength?: number; // [conditional]
  max?: number; // [conditional]
  min?: number; // [conditional]
  pattern?: string; // [conditional]
  customDanger?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customWarning?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customValidation?: (target: InputElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
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
  onInput?: (e: React.SyntheticEvent<InputElement, Event>) => void;
  onChange?: (e: React.SyntheticEvent<InputElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};

export type Attributes = {
  counter?: string; // [conditional]
  type?: string; // default-value: text
  maxlength?: string; // [conditional]
  minlength?: string; // [conditional]
  max?: string; // [conditional]
  min?: string; // [conditional]
  pattern?: string; // [conditional]
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