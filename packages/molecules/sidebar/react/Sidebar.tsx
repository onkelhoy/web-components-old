
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Sidebar as SidebarElement } from "../src";
import "../src/register.js";

// exporting
export { Sidebar as SidebarElement } from "../src";

export type Props = {
  mode?: "open" | "collapsed" | "hover"; // default-value: open
  selected?: string; // [conditional]
  unit?: "mobile" | "pad" | "laptop" | "desktop"; // default-value: desktop
  outsidehamburger?: boolean; // default-value: true
  onChange?: (e: React.SyntheticEvent<SidebarElement, Event>) => void;
  onSelect?: (e: React.SyntheticEvent<SidebarElement, CustomEvent>) => void; // detail: { id (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
  mode?: string; // default-value: open
  selected?: string; // [conditional]
  unit?: string; // default-value: desktop
  outsidehamburger?: string; // default-value: true
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<SidebarElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-sidebar
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-sidebar>
  );
});

export const Sidebar = papHOC<SidebarElement, Props, Attributes>(Component);