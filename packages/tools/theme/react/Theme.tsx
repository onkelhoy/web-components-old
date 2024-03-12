
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Theme as ThemeElement } from "../src";
import "../src/register.js";

// exporting
export { Theme as ThemeElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {

  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {

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