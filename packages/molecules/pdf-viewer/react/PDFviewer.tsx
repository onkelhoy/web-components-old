
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { PDFviewer as PDFviewerElement } from "../src";
import "../src/register.js";

// exporting
export { PDFviewer as PDFviewerElement } from "../src";

export type Props = {
	name?: string; // [conditional]
	type?: "object"|"embed"|"iframe"; // default-value: object
	height?: number; // [conditional]
	url?: string; // [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	name?: string; // [conditional]
	type?: string; // default-value: object
	height?: string; // [conditional]
	url?: string; // [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<PDFviewerElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-pdf-viewer
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-pdf-viewer>
  );
});

export const PDFviewer = papHOC<PDFviewerElement, Props, Attributes>(Component);