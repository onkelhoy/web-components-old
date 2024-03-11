
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { PDFviewer as PDFviewerElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { PDFviewer as PDFviewerElement } from "../src";

export type Props = {
	name?: string;
	type?: "object"|"embed"|"iframe"; // default-value: object [conditional]
	height?: number;
	url?: string;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	name?: string;
	type?: string; // default-value: object [conditional]
	height?: string;
	url?: string;
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