
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Lightdark as LightdarkElement } from "../src";
import "../src/register.js";

// exporting
export { Lightdark as LightdarkElement } from "../src";

export type LightdarkProps = {
  mode?: "light" | "dark";
  children?: React.ReactNode;
  className?: string;
};
export type LightdarkAttributes = {
  mode?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<LightdarkElement, LightdarkAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-lightdark
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-lightdark>
  );
});

export const Lightdark = papHOC<LightdarkElement, LightdarkProps, LightdarkAttributes>(Component);