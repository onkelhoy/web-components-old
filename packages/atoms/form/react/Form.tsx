
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Form as FormElement } from "../src";
import "../src/register.js";

// exporting
export { Form as FormElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  error?: string; // [conditional]
  warning?: string; // [conditional]
  success?: string; // [conditional]
  onSubmit?: (e: React.SyntheticEvent<FormElement, SubmitEvent>) => void;
  onPapSubmit?: (e: React.SyntheticEvent<FormElement, CustomEvent>) => void; // detail: { element (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  error?: string; // [conditional]
  warning?: string; // [conditional]
  success?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<FormElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-form
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-form>
  );
});

export const Form = papHOC<FormElement, Props, Attributes>(Component);