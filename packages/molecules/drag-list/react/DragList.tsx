
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { DragList as DragListElement } from "../src";
import "../src/register.js";

// exporting
export { DragList as DragListElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  dragging?: boolean;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  dragging?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<DragListElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-drag-list
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-drag-list>
  );
});

export const DragList = papHOC<DragListElement, Props, Attributes>(Component);