
import React from "react";

import { papHOC } from "@pap-it/system-react";

// web components
import { Menu as MenuElement } from "../src";
import "../src/register.js";

// exporting
export { Menu as MenuElement } from "../src";

export type Props = React.HTMLAttributes<HTMLElement> & {
  buttonVariant?: "filled" | "outlined" | "clear"; // default-value: clear
  buttonColor?: "primary" | "secondary" | "inverse" | "danger" | "success" | "warning"; // default-value: secondary
  buttonRadius?: "none" | "small" | "medium" | "large" | "circular"; // default-value: medium
  hasitems?: boolean;
  multiple?: boolean;
  closeonselect?: boolean;
  dynamicwidth?: boolean; // default-value: true
  size?: "small" | "medium" | "large"; // default-value: medium
  menuheight?: string; // default-value: 15rem
  revealby?: "hover" | "click"; // default-value: hover
  placement?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center" | "left-top" | "left-bottom" | "left-center" | "right-top" | "right-bottom" | "right-center"; // default-value: bottom-center
  hideonoutsideclick?: boolean; // default-value: true
  open?: boolean;
  onSelect?: (e: React.SyntheticEvent<MenuElement, CustomEvent>) => void; // detail: { value text (note this is early and can be wrong)
  onPreSelect?: (e: React.SyntheticEvent<MenuElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
  onDeselect?: (e: React.SyntheticEvent<MenuElement, CustomEvent>) => void; // detail: {  (note this is early and can be wrong)
  onChange?: (e: React.SyntheticEvent<MenuElement, Event>) => void;
  onShow?: (e: React.SyntheticEvent<MenuElement, Event>) => void;
  onHide?: (e: React.SyntheticEvent<MenuElement, Event>) => void;
  children?: React.ReactNode;
  className?: string;
};
export type Attributes = React.HTMLAttributes<HTMLElement> & {
  buttonVariant?: string; // default-value: clear
  buttonColor?: string; // default-value: secondary
  buttonRadius?: string; // default-value: medium
  multiple?: string;
  "close-on-select"?: string;
  "dynamic-width"?: string; // default-value: true
  size?: string; // default-value: medium
  "menu-height"?: string; // default-value: 15rem
  revealby?: string; // default-value: hover
  placement?: string; // default-value: bottom-center
  hideonoutsideclick?: string; // default-value: true
  open?: string;
  children?: React.ReactNode;
  class?: string;
};

const Component = React.forwardRef<MenuElement, Attributes>((props, forwardref) => {
  const { children, ...attributes } = props;

  return (
    <pap-menu
      {...attributes}
      ref={forwardref}
    >
      {children}
    </pap-menu>
  );
});

export const Menu = papHOC<MenuElement, Props, Attributes>(Component);