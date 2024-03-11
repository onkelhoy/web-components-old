
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Message as MessageElement } from "../src";
import "../src/register.js";

// exporting
export { Message as MessageElement } from "../src";

export type MessageProps = {
	variant?: "warning"|"error"|"success"; // default-value: success
  children?: React.ReactNode;
  className?: string;
};
export type MessageAttributes = {
	variant?: string; // default-value: success
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<MessageElement, MessageAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-message
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-message>
  );
});

export const Message = papHOC<MessageElement, MessageProps, MessageAttributes>(Component);