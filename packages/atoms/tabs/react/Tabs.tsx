
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Tabs as TabsElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Tabs as TabsElement } from "../src";

export type Props = {
	selected?: string;
	indicator?: boolean; // default-value: true [conditional]
	scrolling?: boolean;
	onTabSelect?: (e:CustomEvent) => void; // detail: {  (note this is early and can be wrong)
	onChange?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	selected?: string;
	indicator?: string; // default-value: true [conditional]
	scrolling?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<TabsElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-tabs
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-tabs>
  );
});

export const Tabs = papHOC<TabsElement, Props, Attributes>(Component);