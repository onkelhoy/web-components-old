
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Popup as PopupElement } from "../src";
import "../src/register.js";

// exporting
export { Popup as PopupElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  hideonoutsideclick?: boolean;
  variant?: "global" | "parent"; // default-value: global
  state?: "show" | "hide"; // default-value: hide
  onPopupShow?: (e: React.SyntheticEvent<PopupElement, Event>) => void;
  onPopupHide?: (e: React.SyntheticEvent<PopupElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  hideonoutsideclick?: string;
  variant?: string; // default-value: global
  state?: string; // default-value: hide
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