
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Textarea as TextareaElement } from "../src";
import "../src/register.js";

// exporting
export { Textarea as TextareaElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  counter?: boolean; // [conditional]
  maxlength?: number; // [conditional]
  minlength?: number; // [conditional]
  max?: number; // [conditional]
  min?: number; // [conditional]
  pattern?: string; // [conditional]
  rows?: number; // default-value: 2
  resize?: "none" | "verical" | "auto"; // default-value: auto
  customDanger?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customWarning?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customValidation?: (target: TextareaElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
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
  onChange?: (e: React.SyntheticEvent<TextareaElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  counter?: string; // [conditional]
  maxlength?: string; // [conditional]
  minlength?: string; // [conditional]
  max?: string; // [conditional]
  min?: string; // [conditional]
  pattern?: string; // [conditional]
  rows?: string; // default-value: 2
  resize?: string; // default-value: auto
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

const Component = React.forwardRef<TextareaElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-textarea
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-textarea>
  );
});

export const Textarea = papHOC<TextareaElement, Props, Attributes>(Component);