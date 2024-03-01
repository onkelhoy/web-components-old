
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Search as SearchElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Search as SearchElement } from "../src";

export type Props = {
	toggled?: boolean;
	scope?: string;
	onChange?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	toggled?: string;
	scope?: string;
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