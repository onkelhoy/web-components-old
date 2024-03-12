
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Tab as TabElement } from "../src";
import "../src/register.js";

// exporting
export { Tab as TabElement } from "../src";

export type TabProps = {
	text?: string; // default-value: Tab
	onClick?: (e: React.SyntheticEvent<TabElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type TabAttributes = {
	text?: string; // default-value: Tab
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<TabElement, TabAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-tab
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-tab>
  );
});

export const Tab = papHOC<TabElement, TabProps, TabAttributes>(Component);