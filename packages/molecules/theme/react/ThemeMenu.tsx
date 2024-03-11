
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { ThemeMenu as ThemeMenuElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { ThemeMenu as ThemeMenuElement } from "../src";

export type ThemeMenuProps = {

  children?: React.ReactNode;
  className?: string;
};
export type ThemeMenuAttributes = {

  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ThemeMenuElement, ThemeMenuAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-theme-menu
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-theme-menu>
  );
});

export const ThemeMenu = papHOC<ThemeMenuElement, ThemeMenuProps, ThemeMenuAttributes>(Component);