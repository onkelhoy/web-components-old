
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Pagination as PaginationElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Pagination as PaginationElement } from "../src";

export type Props = {
	page?: number;
	perpage?: number;
	total?: number;
	scope?: string;
	onPage?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	page?: string;
	perpage?: string;
	total?: string;
	scope?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<PaginationElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-pagination
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-pagination>
  );
});

export const Pagination = papHOC<PaginationElement, Props, Attributes>(Component);