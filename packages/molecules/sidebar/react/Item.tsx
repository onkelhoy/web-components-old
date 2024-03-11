
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Item as ItemElement } from "../src";
import "../src/register.js";

// exporting
export { Item as ItemElement } from "../src";

export type ItemProps = {
  icon?: string; // [conditional]
  icon_selected?: string; // [conditional]
  text?: string;
  counter?: number; // [conditional]
  isparent?: boolean;
  indicator?: boolean;
  static?: boolean;
  open?: boolean; // default-value: true
  onReachedMax?: (e: React.SyntheticEvent<ItemElement, Event>) => void;
  onChildSelect?: (e: React.SyntheticEvent<ItemElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
  onSelect?: (e: React.SyntheticEvent<ItemElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type ItemAttributes = {
  icon?: string; // [conditional]
  icon_selected?: string; // [conditional]
  text?: string;
  counter?: string; // [conditional]
  isparent?: string;
  indicator?: string;
  static?: string;
  open?: string; // default-value: true
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ItemElement, ItemAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-sidebar-item
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-sidebar-item>
  );
});

export const Item = papHOC<ItemElement, ItemProps, ItemAttributes>(Component);