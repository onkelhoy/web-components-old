
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Field as FieldElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Field as FieldElement } from "../src";

export type Props = {
  customDanger?: Partial<Record<keyof ValidityState, string>>;
  customWarning?: Partial<Record<keyof ValidityState, string>>;
  customValidation?: (target: FieldElement) => { message: string; state: "default" | "info" | "success" | "warning" | "danger" } | undefined;
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

const Component = React.forwardRef<FieldElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-field-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-field-template>
  );
});

export const Field = papHOC<FieldElement, Props, Attributes>(Component);