
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Sidebar as SidebarElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Sidebar as SidebarElement } from "../src";

export type Props = {
	mode?: "open"|"collapsed"|"hover"; // default-value: open [conditional]
	selected?: string;
	unit?: "mobile"|"pad"|"laptop"|"desktop"; // default-value: desktop [conditional]
	outsidehamburger?: boolean; // default-value: true [conditional]
	onChange?: (e:Event) => void;
	onSelect?: (e:CustomEvent) => void; // detail: { id (note this is early and can be wrong)
	onSelect?: (e:CustomEvent) => void; // detail: { id (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	mode?: string; // default-value: open [conditional]
	selected?: string;
	unit?: string; // default-value: desktop [conditional]
	outsidehamburger?: string; // default-value: true [conditional]
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