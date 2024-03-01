
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { FormElement as FormElementElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { FormElement as FormElementElement } from "../src";

export type Props = {
	defaultValue?: string;
	disabled?: boolean;
	name?: string; // default-value: missing-name [conditional]
	value?: string;
	onChange?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	"default-value"?: string;
	disabled?: string;
	name?: string; // default-value: missing-name [conditional]
	value?: string;
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