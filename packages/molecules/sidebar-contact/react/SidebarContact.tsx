
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { SidebarContact as SidebarContactElement } from "../src";
import "../src/register.js";

// exporting
export { SidebarContact as SidebarContactElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  contacts?: Array<any>;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  open?: string;
  contacts?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<SidebarContactElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-sidebar-contact
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-sidebar-contact>
  );
});

export const SidebarContact = papHOC<SidebarContactElement, Props, Attributes>(Component);