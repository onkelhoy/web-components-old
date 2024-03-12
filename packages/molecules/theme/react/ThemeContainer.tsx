
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { ThemeContainer as ThemeContainerElement } from "../src";
import "../src/register.js";

// exporting
export { ThemeContainer as ThemeContainerElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {

  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {

  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ThemeContainerElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-theme
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-theme>
  );
});

export const ThemeContainer = papHOC<ThemeContainerElement, Props, Attributes>(Component);