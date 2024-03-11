
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Form as FormElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Form as FormElement } from "../src";

export type Props = {
	error?: string;
	warning?: string;
	success?: string;
	onSubmit?: (e:SubmitEvent) => void;
	onPapSubmit?: (e:CustomEvent) => void; // detail: { element (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	error?: string;
	warning?: string;
	success?: string;
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