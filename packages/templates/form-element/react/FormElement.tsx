
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { FormElement as FormElementElement } from "../src";
import "../src/register.js";

// exporting
export { FormElement as FormElementElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  defaultValue?: string; // [conditional]
  disabled?: boolean; // [conditional]
  name?: string; // default-value: missing-name
  value?: string; // [conditional]
  onChange?: (e: React.SyntheticEvent<FormElementElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  "default-value"?: string; // [conditional]
  disabled?: string; // [conditional]
  name?: string; // default-value: missing-name
  value?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<FormElementElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-form-element-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-form-element-template>
  );
});

export const FormElement = papHOC<FormElementElement, Props, Attributes>(Component);