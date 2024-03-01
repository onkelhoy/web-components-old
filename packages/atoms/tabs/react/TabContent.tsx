
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { TabContent as TabContentElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { TabContent as TabContentElement } from "../src";

export type TabContentProps = {

  children?: React.ReactNode;
  className?: string;
};
export type TabContentAttributes = {

  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<TabContentElement, TabContentAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-tab-content
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-tab-content>
  );
});

export const TabContent = papHOC<TabContentElement, TabContentProps, TabContentAttributes>(Component);