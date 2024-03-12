
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Editor as EditorElement } from "../src";
import "../src/register.js";

// exporting
export { Editor as EditorElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  foo?: "bar" | "hello world"; // default-value: bar
  bajs?: number; // [conditional]
  fooLaa?: boolean; // default-value: true
  onMainClick?: (e: React.SyntheticEvent<EditorElement, CustomEvent>) => void; // detail: { foo (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  foo?: string; // default-value: bar
  bajs?: string; // [conditional]
  fooLaa?: string; // default-value: true
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<EditorElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-editor
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-editor>
  );
});

export const Editor = papHOC<EditorElement, Props, Attributes>(Component);