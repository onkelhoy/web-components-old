
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Theme as ThemeElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Theme as ThemeElement } from "../src";

export type Props = {

  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {

  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ThemeElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-theme-tool
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-theme-tool>
  );
});

export const Theme = papHOC<ThemeElement, Props, Attributes>(Component);