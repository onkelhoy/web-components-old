
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Select as SelectElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Select as SelectElement } from "../src";

export type Props = {
  multiple?: boolean;
  menuheight?: string; // default-value: 15rem [conditional]
  revealby?: "hover" | "click"; // default-value: click [conditional]
  placement?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center" | "left-top" | "left-bottom" | "left-center" | "right-top" | "right-bottom" | "right-center"; // default-value: bottom-left [conditional]
  hideonoutsideclick?: boolean; // default-value: true [conditional]
  open?: boolean;
  dynamicwidth?: boolean;
  text?: string;
  inputsize?: number;
  value?: string;
  maxlength?: number;
  minlength?: number;
  max?: number;
  min?: number;
  search?: "additive" | "static";
  pattern?: string;
  options?: Array<any>;
  customDanger?: Partial<Record<keyof ValidityState, string>>;
  customWarning?: Partial<Record<keyof ValidityState, string>>;
  customValidation?: (target: SelectElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
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
  onShow?: (e: Event) => void;
  onHide?: (e: Event) => void;
  onSearch?: (e: CustomEvent) => void; // detail: { value regexp (note this is early and can be wrong)
  onChange?: (e: Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
  multiple?: string;
  "menu-height"?: string; // default-value: 15rem [conditional]
  revealby?: string; // default-value: click [conditional]
  placement?: string; // default-value: bottom-left [conditional]
  hideonoutsideclick?: string; // default-value: true [conditional]
  open?: string;
  "dynamic-width"?: string;
  "input-size"?: string;
  value?: string;
  maxlength?: string;
  minlength?: string;
  max?: string;
  min?: string;
  search?: string;
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