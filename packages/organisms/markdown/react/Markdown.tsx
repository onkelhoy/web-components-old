
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Markdown as MarkdownElement } from "../src";
import "../src/register.js";

// exporting
export { Markdown as MarkdownElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  assetBase?: string; // default-value: /public
  cache?: boolean;
  file?: string;
  url?: string; // [conditional]
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  "asset-base"?: string; // default-value: /public
  cache?: string;
  file?: string;
  url?: string; // [conditional]
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