
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Popup as PopupElement } from "../src";
import "../register.bundle.mjs";

// exporting
export { Popup as PopupElement } from "../src";

export type Props = {
	hideonoutsideclick?: boolean;
	variant?: "global"|"parent"; // default-value: global [conditional]
	state?: "show"|"hide"; // default-value: hide [conditional]
	onPopupShow?: (e:Event) => void;
	onPopupHide?: (e:Event) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = {
	hideonoutsideclick?: string;
	variant?: string; // default-value: global [conditional]
	state?: string; // default-value: hide [conditional]
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<PopupElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-popup
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-popup>
  );
});

export const Popup = papHOC<PopupElement, Props, Attributes>(Component);