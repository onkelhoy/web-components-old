
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Input as InputElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Input as InputElement } from "../src";

export type InputProps = {

  children?: React.ReactNode;
  className?: string;
};
export type InputAttributes = {

  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<InputElement, InputAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-editor-input
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-editor-input>
  );
});

export const Input = papHOC<InputElement, InputProps, InputAttributes>(Component);