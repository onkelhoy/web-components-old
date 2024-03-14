
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { ItemTemplate as ItemTemplateElement } from "../src";
import "../src/register.js";

// exporting
export { ItemTemplate as ItemTemplateElement } from "../src";

export type ItemTemplateProps = React.HTMLAttributes<HTMLElement> & {
	size?: "small"|"medium"|"large"; // default-value: medium
	divider?: boolean;
	selected?: boolean;
	value?: string;
	radius?: "small"|"medium"|"large"|"none"|"circular"; // default-value: small
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical
	onClick?: (e: React.SyntheticEvent<ItemTemplateElement, Event>) => void;
	onSelect?: (e: React.SyntheticEvent<ItemTemplateElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type ItemTemplateAttributes = React.HTMLAttributes<HTMLElement> & {
	size?: string; // default-value: medium
	divider?: string;
	selected?: string;
	value?: string;
	radius?: string; // default-value: small
	elevation?: string; // default-value: none
	"elevation-direction"?: string; // default-value: vertical
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<ItemTemplateElement, ItemTemplateAttributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-item-template
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-item-template>
  );
});

export const ItemTemplate = papHOC<ItemTemplateElement, ItemTemplateProps, ItemTemplateAttributes>(Component);