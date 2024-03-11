
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Editor as EditorElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Editor as EditorElement } from "../src";

export type Props = {
	foo?: "bar"|"hello world"; // default-value: bar [conditional]
	bajs?: number;
	fooLaa?: boolean; // default-value: true [conditional]
	onMainClick?: (e:CustomEvent) => void; // detail: { foo (note this is early and can be wrong)
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	foo?: string; // default-value: bar [conditional]
	bajs?: string;
	fooLaa?: string; // default-value: true [conditional]
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