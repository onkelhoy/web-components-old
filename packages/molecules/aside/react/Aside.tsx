
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Aside as AsideElement } from "../src";
import "../src/register.js";

// exporting
export { Aside as AsideElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
	backdrop?: boolean; // default-value: true
	hideonoutsideclick?: boolean; // default-value: true
	open?: boolean;
	placement?: "left"|"right"|"top"|"bottom"; // default-value: right
	radius?: "none"|"small"|"medium"|"large"|"circular"; // default-value: medium
	mode?: "normal"|"fixed"; // default-value: normal
	width?: string; // [conditional]
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical
	onHide?: (e: React.SyntheticEvent<AsideElement, Event>) => void;
	onShow?: (e: React.SyntheticEvent<AsideElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
	"backdrop"?: string; // default-value: true
	"hideonoutsideclick"?: string; // default-value: true
	"open"?: string;
	"placement"?: string; // default-value: right
	"radius"?: string; // default-value: medium
	"mode"?: string; // default-value: normal
	"width"?: string; // [conditional]
	"elevation"?: string; // default-value: none
	"elevation-direction"?: string; // default-value: vertical
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<AsideElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-aside
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-aside>
  );
});

export const Aside = papHOC<AsideElement, Props, Attributes>(Component);