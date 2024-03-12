
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Select as SelectElement } from "../src";
import "../src/register.js";

// exporting
export { Select as SelectElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  multiple?: boolean;
  menuheight?: string; // default-value: 15rem
  revealby?: "hover" | "click"; // default-value: click
  placement?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center" | "left-top" | "left-bottom" | "left-center" | "right-top" | "right-bottom" | "right-center"; // default-value: bottom-left
  hideonoutsideclick?: boolean; // default-value: true
  open?: boolean;
  dynamicwidth?: boolean;
  text?: string;
  inputsize?: number; // [conditional]
  value?: string; // [conditional]
  maxlength?: number; // [conditional]
  minlength?: number; // [conditional]
  max?: number; // [conditional]
  min?: number; // [conditional]
  search?: "additive" | "static"; // [conditional]
  pattern?: string; // [conditional]
  options?: Array<any>; // [conditional]
  customDanger?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customWarning?: Partial<Record<keyof ValidityState, string>>; // [conditional]
  customValidation?: (target: SelectElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
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
  onShow?: (e: React.SyntheticEvent<SelectElement, Event>) => void;
  onHide?: (e: React.SyntheticEvent<SelectElement, Event>) => void;
  onSearch?: (e: React.SyntheticEvent<SelectElement, CustomEvent>) => void; // detail: { value regexp (note this is early and can be wrong)
  onChange?: (e: React.SyntheticEvent<SelectElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  multiple?: string;
  "menu-height"?: string; // default-value: 15rem
  revealby?: string; // default-value: click
  placement?: string; // default-value: bottom-left
  hideonoutsideclick?: string; // default-value: true
  open?: string;
  "dynamic-width"?: string;
  "input-size"?: string; // [conditional]
  value?: string; // [conditional]
  maxlength?: string; // [conditional]
  minlength?: string; // [conditional]
  max?: string; // [conditional]
  min?: string; // [conditional]
  search?: string; // [conditional]
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
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<SelectElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-select
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-select>
  );
});

export const Select = papHOC<SelectElement, Props, Attributes>(Component);