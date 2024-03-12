
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Search as SearchElement } from "../src";
import "../src/register.js";

// exporting
export { Search as SearchElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  toggled?: boolean;
  scope?: string; // [conditional]
  onChange?: (e: React.SyntheticEvent<SearchElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  toggled?: string;
  scope?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<SearchElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-search
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-search>
  );
});

export const Search = papHOC<SearchElement, Props, Attributes>(Component);