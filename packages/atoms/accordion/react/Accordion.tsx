
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Accordion as AccordionElement } from "../src";
import "../src/register.js";

// exporting
export { Accordion as AccordionElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  mode?: "horizontal" | "vertical"; // default-value: vertical
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  open?: string;
  mode?: string; // default-value: vertical
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<AccordionElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-accordion
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-accordion>
  );
});

export const Accordion = papHOC<AccordionElement, Props, Attributes>(Component);