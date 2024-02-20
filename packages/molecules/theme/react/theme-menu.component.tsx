import React, { forwardRef, useEffect, useRef } from "react";

import { loadAll, unloadAll, add, extractName, EventMap, EventHandler } from "@pap-it/system-react";

// web components

import { ThemeMenu as ThemeMenuElement } from "@pap-it/theme";
import "@pap-it/theme/wc";

// we also want to export our element's
export { ThemeMenu as ThemeMenuElement } from "@pap-it/theme";

export type Props = PapReactElement<ThemeMenuAttributes> & {
  onClick?: EventHandler;
}

export const ThemeMenu = forwardRef<ThemeMenuElement, Props>((props, forwardref) => {
  const { children, onClick, ...restprops } = props;

  const internalref = useRef<ThemeMenuElement>(null);
  const eventmap = useRef<EventMap>({});

  useEffect(() => {
    loadAll(internalref, forwardref, eventmap);

    return () => {
      unloadAll(internalref, eventmap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalref.current]);

  useEffect(() => {
    const propnames = Object.keys(props) as Array<keyof Props>;
    for (const name of propnames) {
      if (typeof props[name] === "function") {
        const eventname = extractName(name);
        if (eventname) {
          add(internalref, eventmap, name, eventname, props[name] as unknown as EventListener);
        }
        else {
          console.log(`[warn]: (pap-react: button) inserting event failed - ${String(name)} not a event`);
        }
      }
      else if (props[name] instanceof Object) {
        // conver to string ? 
      }
    }
  }, [props]);

  return (
    <pap-theme-menu
      {...restprops}
      class={props.className}
      ref={internalref}
    >
      {children}
    </pap-theme-menu>
  )
})