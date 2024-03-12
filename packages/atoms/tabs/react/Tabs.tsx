
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Tabs as TabsElement } from "../src";
import "../src/register.js";

// exporting
export { Tabs as TabsElement } from "../src";

export type Props = {
	selected?: string; // [conditional]
	indicator?: boolean; // default-value: true
	scrolling?: boolean;
	onTabSelect?: (e: React.SyntheticEvent<TabsElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
	onChange?: (e: React.SyntheticEvent<TabsElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	selected?: string; // [conditional]
	indicator?: string; // default-value: true
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