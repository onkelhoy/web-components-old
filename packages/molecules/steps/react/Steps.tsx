
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Steps as StepsElement } from "../src";
import "../src/register.js";

// exporting
export { Steps as StepsElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  steps?: Array<any>;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  steps?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<StepsElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-steps
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-steps>
  );
});

export const Steps = papHOC<StepsElement, Props, Attributes>(Component);