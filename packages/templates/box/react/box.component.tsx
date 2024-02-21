import React, { forwardRef, useEffect, useRef } from "react";

import { loadAll, unloadAll, add, extractName, EventMap, EventHandler } from "@pap-it/system-react";

// web components

import { Box as BoxElement } from "@pap-it/templates-box";
import "@pap-it/templates-box/wc";

// we also want to export our element's
export { Box as BoxElement } from "@pap-it/templates-box";

export type Props = PapReactElement<BoxAttributes> & {
  onClick?: EventHandler;
}

export const Box = forwardRef<BoxElement, Props>((props, forwardref) => {
  const { children, onClick, ...restprops } = props;

  const internalref = useRef<BoxElement>(null);
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
    <pap-box
      {...restprops}
      class={props.className}
      ref={internalref}
    >
      {children}
    </pap-box>
  )
})