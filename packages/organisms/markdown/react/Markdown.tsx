
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Markdown as MarkdownElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Markdown as MarkdownElement } from "../src";

export type Props = {
	assetBase?: string; // default-value: /public [conditional]
	cache?: boolean;
	file?: string;
	url?: string;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	"asset-base"?: string; // default-value: /public [conditional]
	cache?: string;
	file?: string;
	url?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<MarkdownElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-markdown
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-markdown>
  );
});

export const Markdown = papHOC<MarkdownElement, Props, Attributes>(Component);