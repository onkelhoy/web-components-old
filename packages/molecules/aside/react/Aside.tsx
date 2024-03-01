
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Aside as AsideElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Aside as AsideElement } from "../src";

export type Props = {
	backdrop?: boolean; // default-value: true [conditional]
	hideonoutsideclick?: boolean; // default-value: true [conditional]
	open?: boolean;
	placement?: "left"|"right"|"top"|"bottom"; // default-value: right [conditional]
	radius?: "none"|"small"|"medium"|"large"|"circular"; // default-value: medium [conditional]
	mode?: "normal"|"fixed"; // default-value: normal [conditional]
	width?: string;
	elevation?: "none"|"small"|"medium"|"large"|"x-large"; // default-value: none [conditional]
	elevationdirection?: "vertical"|"horizontal"; // default-value: vertical [conditional]
	onHide?: (e:Event) => void;
	onShow?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	backdrop?: string; // default-value: true [conditional]
	hideonoutsideclick?: string; // default-value: true [conditional]
	open?: string;
	placement?: string; // default-value: right [conditional]
	radius?: string; // default-value: medium [conditional]
	mode?: string; // default-value: normal [conditional]
	width?: string;
	elevation?: string; // default-value: none [conditional]
	"elevation-direction"?: string; // default-value: vertical [conditional]
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