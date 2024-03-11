
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Item as ItemElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Item as ItemElement } from "../src";

export type ItemProps = {
	dragged?: boolean;
	onDragStart?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type ItemAttributes = {
	dragged?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ItemElement, ItemAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-drag-list-item
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-drag-list-item>
  );
});

export const Item = papHOC<ItemElement, ItemProps, ItemAttributes>(Component);