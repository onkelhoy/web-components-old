
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { PrefixSuffix as PrefixSuffixElement } from "../src";
import "../src/register.js";

// exporting
export { PrefixSuffix as PrefixSuffixElement } from "../src";

export type Props = {

  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {

  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<PrefixSuffixElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-prefix-suffix-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-prefix-suffix-template>
  );
});

export const PrefixSuffix = papHOC<PrefixSuffixElement, Props, Attributes>(Component);